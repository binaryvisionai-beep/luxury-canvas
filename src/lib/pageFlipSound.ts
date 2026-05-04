// Synthesized paper page-flip sound via WebAudio — no asset files.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playPageFlip(volume = 0.35) {
  const ac = getCtx();
  if (!ac) return;

  const duration = 0.45;
  const sampleRate = ac.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ac.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // Pinkish noise with decaying envelope
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    const decay = 1 - i / length;
    data[i] = (white * 0.6 + last * 6) * decay;
  }

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.4;
  const now = ac.currentTime;
  bp.frequency.setValueAtTime(800, now);
  bp.frequency.exponentialRampToValueAtTime(3200, now + 0.18);
  bp.frequency.exponentialRampToValueAtTime(1200, now + duration);

  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 400;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(volume * 0.4, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  src.connect(bp).connect(hp).connect(gain).connect(ac.destination);
  src.start(now);
  src.stop(now + duration + 0.05);
}

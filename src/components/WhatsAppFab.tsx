import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/919860698281"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 grid h-13 w-13 place-items-center rounded-full bg-whatsapp text-white shadow-luxury"
      style={{ height: 52, width: 52 }}
    >
      <MessageCircle size={24} fill="currentColor" />
      <span className="absolute inset-0 rounded-full animate-ping bg-whatsapp/40" />
    </motion.a>
  );
}

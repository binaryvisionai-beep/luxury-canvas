import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shivers, North Goa" },
      { name: "description", content: "A glimpse of luxury at Shivers — rooms, dining and events captured in moments." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ComingSoonPage
        title="Gallery"
        subtitle="A glimpse of the Shivers experience"
        body="Our full gallery is being curated. In the meantime, browse our rooms, restaurant and events sections to see Shivers in motion."
      />
    </SiteLayout>
  ),
});

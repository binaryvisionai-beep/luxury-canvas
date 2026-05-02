import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Shivers, North Goa" },
      { name: "description", content: "Shivers is a luxury hospitality destination in North Goa offering stays, dining and unforgettable experiences." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ComingSoonPage
        title="About Shivers"
        subtitle="Luxury hospitality on the shores of North Goa"
        body="A serene luxury escape offering premium rooms, fine dining and stunning experiences — built around warm, personalized service."
      />
    </SiteLayout>
  ),
});

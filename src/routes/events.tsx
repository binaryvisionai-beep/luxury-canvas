import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EventsPage } from "@/components/pages/EventsPage";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Experiences — Shivers, North Goa" },
      { name: "description", content: "Celebrate every special moment with us — custom setups, great food and unforgettable events." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <EventsPage />
    </SiteLayout>
  ),
});

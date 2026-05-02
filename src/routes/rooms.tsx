import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { RoomsPage } from "@/components/pages/RoomsPage";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Our Rooms — Shivers Luxury Stay in North Goa" },
      { name: "description", content: "Choose your perfect stay at Shivers — Deluxe, Super Deluxe and Luxury Suite rooms with world-class amenities." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <RoomsPage />
    </SiteLayout>
  ),
});

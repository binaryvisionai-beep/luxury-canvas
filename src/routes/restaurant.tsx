import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { RestaurantPage } from "@/components/pages/RestaurantPage";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Shivers Garden Restaurant — Fine Dining in North Goa" },
      { name: "description", content: "Cosy ambience, warm hospitality and delicious cuisine made with love. Reserve your table at Shivers Garden Restaurant." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <RestaurantPage />
    </SiteLayout>
  ),
});

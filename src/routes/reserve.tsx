import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ReservePage } from "@/components/pages/ReservePage";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Shivers Garden Restaurant" },
      { name: "description", content: "Pick your date, time and table at Shivers Garden Restaurant for an unforgettable evening." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ReservePage />
    </SiteLayout>
  ),
});

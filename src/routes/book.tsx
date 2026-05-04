import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BookStayPage } from "@/components/pages/BookStayPage";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Stay — Shivers Luxury Resort" },
      { name: "description", content: "Browse rooms, view details and book your luxury stay at Shivers, North Goa." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <BookStayPage />
    </SiteLayout>
  ),
});

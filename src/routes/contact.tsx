import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shivers, North Goa" },
      { name: "description", content: "Get in touch with Shivers — call +91 98765 43210 or email info@shiversgoa.com." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ComingSoonPage
        title="Contact Us"
        subtitle="We'd love to hear from you"
        body="Call +91 98765 43210 or email info@shiversgoa.com — Ozran, North Goa, Goa - 403509."
      />
    </SiteLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HomePage } from "@/components/pages/HomePage";

export const Route = createFileRoute("/")({
  component: () => (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  ),
});

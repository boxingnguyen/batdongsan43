import { EtherealHomeClient } from "@/components/Home/EtherealHomeClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Refined Minimalism`,
  description: "Curating the world's most exceptional architectural masterpieces.",
};

export default function HomePage() {
  return (
    <main>
      <EtherealHomeClient />
    </main>
  );
}

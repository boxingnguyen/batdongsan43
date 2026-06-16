import { EtherealHomeClient } from "@/components/Home/EtherealHomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethereal Estate | Refined Minimalism",
  description: "Curating the world's most exceptional architectural masterpieces.",
};

export default function HomePage() {
  return (
    <main>
      <EtherealHomeClient />
    </main>
  );
}

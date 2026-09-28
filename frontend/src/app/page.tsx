import type { Metadata } from "next";
import { EtherealHomeClient } from "@/components/Home/EtherealHomeClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <EtherealHomeClient />
    </main>
  );
}

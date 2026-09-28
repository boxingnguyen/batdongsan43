import { ContactForm } from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với chúng tôi",
  alternates: { canonical: "/lien-he" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-5 md:px-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium italic text-[#4a3829] dark:text-[#faddc8] mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-[#4e453e] dark:text-[#d2c4bb]">
            Hãy để lại thông tin của bạn và chúng tôi sẽ liên hệ với bạn sớm
            nhất có thể.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}

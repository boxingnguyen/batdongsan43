"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { validateEmail } from "@/components/utils/validateEmail";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";

const HomeContact = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation (only name and phone are required)
    if (!formData.name.trim()) {
      newErrors.name = t("errors.nameRequired");
    }
    // Email is optional, but if provided, validate format
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("errors.phoneRequired");
    }
    // Message is optional, no validation needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to API
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Success
      toast.success(
        locale === "vi"
          ? "Gửi form thành công! Cảm ơn bạn đã liên hệ."
          : "Form submitted successfully! Thank you for contacting us."
      );
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Show more helpful error message
      if (errorMessage.includes("GOOGLE_SCRIPT_URL") || errorMessage.includes("not configured")) {
        toast.error(
          locale === "vi"
            ? "Cấu hình chưa hoàn tất. Vui lòng kiểm tra file .env.local và xem hướng dẫn trong GOOGLE_SHEETS_SETUP.md"
            : "Configuration incomplete. Please check your .env.local file and see GOOGLE_SHEETS_SETUP.md for instructions"
        );
      } else {
        toast.error(
          locale === "vi"
            ? "Có lỗi xảy ra. Vui lòng thử lại sau."
            : "An error occurred. Please try again later."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full py-10 md:py-24 relative"
      style={{
        backgroundImage: "url(/images/home/cover-footer.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      id="contact"
    >
      <div className="absolute inset-0 bg-[#1a4d4d]/80"></div>
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className=" mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl md:text-[28px] font-black leading-[50px] text-white text-center relative pb-4 after:content-[''] after:w-[100px] after:h-[2px] after:bg-white after:bottom-0 after:left-1/2 after:absolute after:-translate-x-1/2">
              {t("title")}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mb-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.name")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.email")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("form.phone")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("form.message")}
                  rows={4}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 resize-none transition-colors"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}      
                  className="
                    border-2 border-white text-white 
                    text-sm px-6 py-2 
                    md:text-base md:px-8
                    rounded-md hover:bg-white hover:text-[#1a4d4d] 
                    transition-colors duration-300 uppercase 
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting
                    ? locale === "vi"
                      ? "Đang gửi..."
                      : "Submitting..."
                    : t("form.submit")}
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-12 max-w-7xl mx-auto items-start text-left">
            
            {/* 1. KHỐI THÔNG TIN */}
            <div className="space-y-4">
              <h2 className="text-white font-bold text-lg uppercase">
                {t("info.projectName")}
              </h2>
              <div className="space-y-2 text-white">
                <p>
                  <span className="font-semibold">{t("info.hotline1_label")}:</span>{" "}
                  <a href="tel:0345747138" className="hover:underline">
                    {t("info.hotline1_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.hotline2_label")}:</span>{" "}
                  <a href="tel:0826768386" className="hover:underline">
                    {t("info.hotline2_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.email_label")}:</span>{" "}
                  <a href="mailto:Thesoleildanangofficial@gmail.com" className="hover:underline">
                    {t("info.email_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.address_label")}:</span>{" "}
                  {t("info.address_value")}
                </p>
              </div>
              <Link
                href="/terms" 
                className="text-white hover:underline block mt-4"
              >
                {t("info.termsOfUse")}
              </Link>
            </div>

            {/* 2. KHỐI ICON */}
            <div className="space-y-6 flex flex-col items-start">
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a
                  href={t("social.facebook")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={t("social.instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={t("social.youtube")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
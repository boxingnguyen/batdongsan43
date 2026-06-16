"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import toast from "react-hot-toast";

const PopupContact = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === TIMER LOGIC ===
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const intervalTimer = setInterval(() => {
      setIsVisible(true);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- NO VALIDATION REQUIRED ---
    
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

      // Success Toast
      toast.success(
        locale === "vi"
          ? "Gửi thành công! Chúng tôi sẽ liên hệ sớm."
          : "Submitted successfully! We will contact you soon."
      );
      
      // Reset & Close
      setFormData({ name: "", email: "", phone: "", message: "" });
      handleClose(); 

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        locale === "vi"
          ? "Có lỗi xảy ra. Vui lòng thử lại sau."
          : "An error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      <div className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all scale-100">
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors group"
        >
          <Icon icon="ph:x-bold" className="w-5 h-5 text-gray-600 group-hover:text-black" />
        </button>

        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 relative h-40 md:h-auto bg-gray-100 hidden md:block">
          <Image
            src="/images/home/cover-pool.png"
            alt="Promotion"
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#E3C284] text-[#1a4d4d] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow-md">
            {t("title") || "Limited Offer"}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#1a4d4d] uppercase mb-2">
              {t("title") || "Register Now"}
            </h3>
            <p className="text-gray-500 text-sm">
              {locale === "vi" 
                ? "Điền thông tin để nhận bảng giá & ưu đãi mới nhất." 
                : "Fill in the form to get the latest price list & offers."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.name")}
                className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#E3C284] focus:ring-1 focus:ring-[#E3C284] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("form.phone")}
                        className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#E3C284] focus:ring-1 focus:ring-[#E3C284] transition-all"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.email")}
                        className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#E3C284] focus:ring-1 focus:ring-[#E3C284] transition-all"
                    />
                </div>
            </div>

            <div>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.message")}
                className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#E3C284] focus:ring-1 focus:ring-[#E3C284] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a4d4d] text-[#E3C284] font-bold uppercase py-3.5 rounded-lg hover:bg-[#123535] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting 
                ? (locale === "vi" ? "Đang gửi..." : "Sending...") 
                : t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupContact;
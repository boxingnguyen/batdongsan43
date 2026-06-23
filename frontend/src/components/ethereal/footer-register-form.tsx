"use client";

import { useState } from "react";

export function FooterRegisterForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: "Đăng ký nhận tư vấn từ Footer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#f9f9f9] p-4 border border-[#d2c4bb]/30 text-sm font-semibold tracking-wider font-hanken text-[#4a3829]">
        Đăng ký thành công! Chúng tôi sẽ sớm liên hệ.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          className="w-full bg-[#f9f9f9] border border-[#d2c4bb]/30 px-4 py-3 text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken focus:ring-1 focus:ring-[#4a3829] focus:border-[#4a3829] outline-none transition-all"
          placeholder="Họ và tên *"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="w-full bg-[#f9f9f9] border border-[#d2c4bb]/30 px-4 py-3 text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken focus:ring-1 focus:ring-[#4a3829] focus:border-[#4a3829] outline-none transition-all"
          placeholder="Số điện thoại *"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          className="w-full bg-[#f9f9f9] border border-[#d2c4bb]/30 px-4 py-3 text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken focus:ring-1 focus:ring-[#4a3829] focus:border-[#4a3829] outline-none transition-all"
          placeholder="Email (Không bắt buộc)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        className="w-full bg-[#4a3829] hover:opacity-90 transition-opacity text-white py-3 text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "ĐANG GỬI..." : "ĐĂNG KÝ"}
      </button>
    </form>
  );
}

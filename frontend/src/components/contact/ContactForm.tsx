"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
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

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-[#d4e5d7] border border-[#a8c9ac] rounded p-4 text-[#3d5c42]">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
        </div>
      )}

      {error && (
        <div className="bg-[#f5d7d7] border border-[#e8b4b4] rounded p-4 text-[#8b4545]">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e] dark:text-[#d2c4bb]">
          Họ và tên *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nhập tên của bạn"
          className="w-full border-b border-[#8C7B6E] dark:border-[#d2c4bb]/50 bg-[#e5e2dd]/30 dark:bg-[#2a2a2a]/50 p-3 outline-none transition-all focus:border-[#4a3829] dark:focus:border-[#faddc8] text-[#4a3829] dark:text-[#faddc8] placeholder:text-[#8C7B6E] dark:placeholder:text-[#b0a497]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e] dark:text-[#d2c4bb]">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="w-full border-b border-[#8C7B6E] dark:border-[#d2c4bb]/50 bg-[#e5e2dd]/30 dark:bg-[#2a2a2a]/50 p-3 outline-none transition-all focus:border-[#4a3829] dark:focus:border-[#faddc8] text-[#4a3829] dark:text-[#faddc8] placeholder:text-[#8C7B6E] dark:placeholder:text-[#b0a497]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e] dark:text-[#d2c4bb]">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0345 747 138"
            className="w-full border-b border-[#8C7B6E] dark:border-[#d2c4bb]/50 bg-[#e5e2dd]/30 dark:bg-[#2a2a2a]/50 p-3 outline-none transition-all focus:border-[#4a3829] dark:focus:border-[#faddc8] text-[#4a3829] dark:text-[#faddc8] placeholder:text-[#8C7B6E] dark:placeholder:text-[#b0a497]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e] dark:text-[#d2c4bb]">
          Lời nhắn *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Nhập lời nhắn của bạn"
          className="w-full resize-none border-b border-[#8C7B6E] dark:border-[#d2c4bb]/50 bg-[#e5e2dd]/30 dark:bg-[#2a2a2a]/50 p-3 outline-none transition-all focus:border-[#4a3829] dark:focus:border-[#faddc8] text-[#4a3829] dark:text-[#faddc8] placeholder:text-[#8C7B6E] dark:placeholder:text-[#b0a497]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4a3829] dark:bg-[#6f5a4a] py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Đang gửi..." : "Gửi"}
      </button>
    </form>
  );
}

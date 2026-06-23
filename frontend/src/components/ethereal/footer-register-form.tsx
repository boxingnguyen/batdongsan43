"use client";

import { useState } from "react";

export function FooterRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setSubmitted(true);
      setName(""); setEmail("");
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-xs text-[#4a3829]/70 py-2">Đã đăng ký thành công!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-b border-[#8C7B6E]/30 bg-[#f9f9f9]/50 p-2 text-xs outline-none transition-colors focus:border-[#4a3829]"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-b border-[#8C7B6E]/30 bg-[#f9f9f9]/50 p-2 text-xs outline-none transition-colors focus:border-[#4a3829]"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-fit bg-[#4a3829] px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

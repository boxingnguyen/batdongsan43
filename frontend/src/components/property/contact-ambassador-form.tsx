"use client";

import { useState } from "react";

export function ContactAmbassadorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      setSubmitted(true);
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full border-b border-[#8C7B6E] bg-[#e5e2dd]/30 p-3 outline-none transition-all focus:border-[#4a3829]";

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <p className="font-serif text-xl text-[#4a3829]">Yêu cầu đã được gửi!</p>
        <p className="mt-2 text-sm text-[#4e453e]/70">Chúng tôi sẽ liên hệ sớm nhất.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">Full Name</label>
        <input
          type="text"
          required
          placeholder="Johnathan Sterling"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">Email Address</label>
        <input
          type="email"
          required
          placeholder="j.sterling@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">Message</label>
        <textarea
          rows={4}
          placeholder="I am interested in a private viewing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4a3829] py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Request Private Viewing"}
      </button>
    </form>
  );
}

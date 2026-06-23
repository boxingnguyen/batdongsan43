"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProjectLeadFormProps = {
  variant?: "light" | "dark";
  className?: string;
  projectName?: string;
};

export function ProjectLeadForm({ variant = "dark", className = "", projectName = "" }: ProjectLeadFormProps) {
  const isDark = variant === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: interest || undefined,
          project: projectName || undefined,
        }),
      });
      setSubmitted(true);
      setName(""); setPhone(""); setInterest("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // silent fail — network error edge case
    } finally {
      setLoading(false);
    }
  };

  const inputCls = isDark
    ? "border-white/30 bg-white/10 text-white placeholder:text-white/60"
    : "border-[#d2c4bb] bg-white";

  if (submitted) {
    return (
      <p className={`py-3 text-sm font-semibold ${isDark ? "text-[#fcdd8b]" : "text-[#4a3829]"}`}>
        Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <Input
        name="name"
        placeholder="Họ tên (*)"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls}
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Số điện thoại (*)"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputCls}
      />
      <Input
        name="interest"
        placeholder="Quan tâm sản phẩm ..."
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className={inputCls}
      />
      <Button
        type="submit"
        disabled={loading}
        className={
          isDark
            ? "h-11 bg-[#fcdd8b] font-semibold uppercase tracking-wide text-[#1e2433] hover:bg-[#e8c96a] disabled:opacity-60"
            : "h-11 bg-[#4a3829] font-semibold uppercase tracking-wide text-white hover:bg-[#3d2f24] disabled:opacity-60"
        }
      >
        {loading ? "Đang gửi..." : "Nhận thông tin"}
      </Button>
    </form>
  );
}

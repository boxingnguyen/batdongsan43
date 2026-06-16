"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProjectLeadFormProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function ProjectLeadForm({ variant = "dark", className = "" }: ProjectLeadFormProps) {
  const isDark = variant === "dark";

  return (
    <form
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        name="name"
        placeholder="Họ tên (*)"
        required
        className={
          isDark
            ? "border-white/30 bg-white/10 text-white placeholder:text-white/60"
            : "border-[#d2c4bb] bg-white"
        }
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Số điện thoại (*)"
        required
        className={
          isDark
            ? "border-white/30 bg-white/10 text-white placeholder:text-white/60"
            : "border-[#d2c4bb] bg-white"
        }
      />
      <Input
        name="interest"
        placeholder="Quan tâm sản phẩm ..."
        className={
          isDark
            ? "border-white/30 bg-white/10 text-white placeholder:text-white/60"
            : "border-[#d2c4bb] bg-white"
        }
      />
      <Button
        type="submit"
        className={
          isDark
            ? "h-11 bg-[#fcdd8b] font-semibold uppercase tracking-wide text-[#1e2433] hover:bg-[#e8c96a]"
            : "h-11 bg-[#4a3829] font-semibold uppercase tracking-wide text-white hover:bg-[#3d2f24]"
        }
      >
        Nhận thông tin
      </Button>
    </form>
  );
}
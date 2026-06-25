"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface Props {
  projectName: string;
  accent?: string;
  scrollThreshold?: number;
}

const SESSION_KEY = "project_popup_last_shown";
const SHOW_INTERVAL = 60000; // 1 minute in milliseconds

export function ProjectScrollPopup({
  projectName,
  accent = "#C8A96E",
  scrollThreshold = 500,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const lastShown = sessionStorage.getItem(SESSION_KEY);
    const now = Date.now();

    // Check if we should show based on time interval
    if (lastShown && now - parseInt(lastShown) < SHOW_INTERVAL) {
      return;
    }

    let triggered = false;
    const onScroll = () => {
      if (triggered || window.scrollY < scrollThreshold) return;
      triggered = true;
      setTimeout(() => setVisible(true), 800);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, Date.now().toString());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate: either phone or email is required
    if (!phone && !email) {
      setError("Vui lòng nhập số điện thoại hoặc email");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: phone || "",
          email: email || "",
          project: projectName,
        }),
      });
      setSubmitted(true);
      setTimeout(dismiss, 2500);
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-sm bg-[#1a1208] shadow-2xl">
        {/* Accent top bar */}
        <div className="h-1 w-full rounded-t-sm" style={{ background: accent }} />

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Đóng"
            className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="py-6 text-center">
              <p className="font-serif text-2xl text-white">Cảm ơn bạn!</p>
              <p className="mt-2 text-sm text-white/60">
                Chúng tôi sẽ liên hệ sớm nhất để tư vấn về {projectName}.
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: accent }}
              >
                {projectName}
              </p>
              <h2 className="mt-2 font-serif text-xl text-white sm:text-2xl">
                Nhận Tư Vấn Miễn Phí
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Để lại thông tin — chuyên viên sẽ liên hệ trong 30 phút.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                />
                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm py-3 text-sm font-semibold uppercase tracking-wide text-[#1a1208] transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: accent }}
                >
                  {loading ? "Đang gửi..." : "Đăng Ký Tư Vấn"}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-white/25">
                Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

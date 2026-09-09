"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";

import { getChatProject } from "@/config/chat-projects";
import { validateContact } from "@/lib/validate-contact";
import {
  LeadSubmitError,
  submitLead,
} from "@/lib/chat/api";

/**
 * Same-origin mode (`API_PROXY_TARGET === "/"`): POST to the internal
 * /api/contact route (Google Sheets) — no quota bonus concept server-side.
 */
function useSameOriginLead(): boolean {
  const target = (process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "").trim();
  return target === "/" || target === "";
}

interface LeadDialogProps {
  open: boolean;
  projectKey: string;
  /** Chat session id (sessionStorage scope per project). */
  sessionId: string;
  /** Anonymous persistent device id (localStorage). */
  deviceId: string;
  /** Server-minted anon token so POST /api/lead credits the quota bonus to the right identity. */
  anonToken?: string;
  /** Context note (<= 200 chars) built from the latest answered facts. */
  notePrefill?: string;
  /** ESC / overlay / close button — never blocks the chat. */
  onClose: () => void;
  /**
   * Backend accepted the lead; carries quota_bonus_granted (0 when the identity
   * already received its one-time bonus). Fires only on the POST /api/lead path.
   */
  onLeadSuccess?: (bonusTurns: number) => void;
}

/**
 * Lead capture dialog (rewritten from the source antd Modal version): owns its
 * own overlay + focus, validates via lib/validate-contact, and on success lifts
 * the quota wall via onSuccess.
 */
export function LeadDialog({
  open,
  projectKey,
  sessionId,
  deviceId,
  anonToken,
  notePrefill,
  onClose,
  onLeadSuccess,
}: LeadDialogProps) {
  const config = getChatProject(projectKey);
  const sameOrigin = useSameOriginLead();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "success" | "duplicate">("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Re-entrancy guard: double-click or Enter twice must not fire two submissions.
  const submittingRef = useRef(false);

  // Reopening always resets fields/errors.
  useEffect(() => {
    if (!open) return;
    setName("");
    setPhone("");
    setEmail("");
    setError(null);
    const resetId = window.setTimeout(() => setStatus("form"), 0);
    return () => window.clearTimeout(resetId);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const fields = { name, phone, email };
    const validationError = validateContact(fields, { requireName: true });
    if (validationError) {
      setError(validationError);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      if (sameOrigin) {
        // Same-origin mode → /api/contact (Google Sheets): no quota bonus server-side.
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: "Đăng ký nhận tư vấn qua chat",
            project: config.name,
          }),
        });
        const body = (await response.json().catch(() => null)) as
          | { success?: boolean; error?: string }
          | null;
        if (!response.ok || !body?.success) {
          throw new Error(body?.error ?? "Không gửi được yêu cầu. Vui lòng thử lại.");
        }
        setStatus("success");
        // Same-origin has no bonus concept: the server returns no count → 0.
      } else {
        const result = await submitLead({
          project_key: projectKey,
          session_id: sessionId || undefined,
          device_id: deviceId || undefined,
          anon_token: anonToken || undefined,
          name: name.trim() || undefined,
          phone: phone.trim(),
          consent: true,
          note: notePrefill,
        });
        setStatus("success");
        onLeadSuccess?.(result.quota_bonus_granted ?? 0);
      }
    } catch (err) {
      if (err instanceof LeadSubmitError && err.kind === "duplicate") {
        setStatus("duplicate");
      } else if (err instanceof LeadSubmitError) {
        setError(err.message);
      } else {
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Không gửi được yêu cầu. Vui lòng thử lại."
        );
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-sm border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#C9A45D]/70 focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Nhận tư vấn từ chuyên viên"
    >
      <div className="absolute inset-0 bg-[#16384C]/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-sm bg-[#16384C] shadow-2xl">
        <div className="h-1 w-full rounded-t-sm bg-[#C9A45D]" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="p-6 py-10 text-center sm:p-8" aria-live="polite">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#5C8269]" aria-hidden="true" />
            <p className="mt-4 font-serif text-2xl text-[#F8F7F3]">Cảm ơn Anh/Chị!</p>
            <p className="mt-2 text-sm text-white/60">
              Chuyên viên sẽ liên hệ trong 30 phút.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-sm bg-[#C9A45D] py-3 text-sm font-semibold uppercase tracking-wide text-[#16384C] transition-opacity hover:opacity-90"
            >
              Đóng
            </button>
          </div>
        ) : status === "duplicate" ? (
          <div className="p-6 sm:p-8" aria-live="polite">
            <p className="rounded-sm border border-[#C9A45D]/40 bg-[#C9A45D]/10 px-4 py-3 text-sm text-[#F8F7F3]">
              Số này đã đăng ký, chuyên viên sẽ gọi sớm nhất.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-sm bg-[#C9A45D] py-3 text-sm font-semibold uppercase tracking-wide text-[#16384C] transition-opacity hover:opacity-90"
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A45D]">
              {config.name}
            </p>
            <h2 className="mt-2 font-serif text-xl text-white sm:text-2xl">
              Nhận tư vấn từ chuyên viên
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Để lại số điện thoại, chuyên viên sẽ gọi tư vấn trong khoảng 5 phút (giờ hành chính).
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                aria-label="Họ và tên"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                aria-label="Số điện thoại"
              />
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                aria-label="Email"
              />

              {error && (
                <p role="alert" className="text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#C9A45D] py-3 text-sm font-semibold uppercase tracking-wide text-[#16384C] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {submitting ? "Đang gửi…" : "Nhận bảng giá + ưu đãi"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-white/25">
              Thông tin của bạn được bảo mật tuyệt đối
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

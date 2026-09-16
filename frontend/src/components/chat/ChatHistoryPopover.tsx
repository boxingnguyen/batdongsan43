"use client";

import { useEffect, useRef, useState } from "react";
import { History, Loader2, MessageSquareText } from "lucide-react";

import type { ChatMessage } from "./MessageBubble";
import {
  fetchChatSessionMessages,
  fetchChatSessions,
  type ChatSessionSummary,
} from "@/lib/chat/api";
import { getAnonToken } from "@/lib/chat/identity";

interface ChatHistoryPopoverProps {
  projectKey: string;
  deviceId: string;
  /**
   * Picking a session hands the transcript to ChatPanel — it owns hydration,
   * epoch reset and aborting any in-flight stream.
   */
  onPick: (sessionId: string, transcript: ChatMessage[]) => void;
  /** Open state owned by ChatPanel (the History button in the header). */
  open: boolean;
  onClose: () => void;
  /** Starts a fresh episode: ChatPanel resets transcript + re-fetches greeting. */
  onNewSession: () => void;
}

/** "x minutes ago" style relative time — minimal localization. */
function relativeTime(iso: string): string {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return "";
  const diffMs = Date.now() - ts;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

/**
 * Chat history popover (customer half of the source ChatHistoryDrawer,
 * rewritten without antd): the trigger lives in ChatPanel, the popover anchors
 * absolute under it and closes on Escape or outside click. Customer path only.
 */
export function ChatHistoryPopover({ projectKey, deviceId, onPick, onNewSession, open, onClose }: ChatHistoryPopoverProps) {
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Refetch the session list every time it opens (re-open always refetches — source behavior).
  useEffect(() => {
    if (!open || !deviceId || !projectKey) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    let anonToken: string | null = null;
    try {
      anonToken = getAnonToken(window.localStorage);
    } catch {
      anonToken = null;
    }
    fetchChatSessions(deviceId, projectKey, anonToken)
      .then((items) => {
        if (!cancelled) setSessions(items.filter((item) => item.project_key === projectKey));
      })
      .catch(() => {
        if (!cancelled) {
          setSessions([]);
          setError("Không tải được lịch sử chat. Anh/chị vui lòng thử lại.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deviceId, projectKey, open, reloadKey]);

  // Close when clicking outside the popover.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open, onClose]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const selectSession = async (session: ChatSessionSummary): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      let anonToken: string | null = null;
      try {
        anonToken = getAnonToken(window.localStorage);
      } catch {
        anonToken = null;
      }
      const transcript = await fetchChatSessionMessages(deviceId, session.session_id, projectKey, anonToken);
      onPick(
        session.session_id,
        transcript.map((item, index) => ({
          id: `${session.session_id}-${index}`,
          role: item.role,
          content: item.content,
          ...(item.meta && typeof item.meta === "object" ? item.meta : {}),
        }))
      );
      onClose();
    } catch {
      setError("Không mở được đoạn chat này. Anh/chị vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className="absolute right-0 top-full z-50 mt-2 w-80 rounded-sm border border-[#E8E5DF] bg-white shadow-lg"
      role="dialog"
      aria-label="Lịch sử hội thoại"
    >
      <div className="border-b border-[#E8E5DF] px-4 py-3">
        <p className="font-serif text-sm text-[#16384C]">Hội thoại gần đây</p>
      </div>

      <div className="chat-scroll max-h-80 overflow-y-auto p-2">
        {loading && sessions.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-[#16384C]/60">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Đang tải…
          </div>
        ) : error ? (
          <div className="px-2 py-3">
            <p role="alert" className="text-xs leading-relaxed text-[#B25B36]">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="mt-2 rounded-sm border border-[#C9A45D]/60 px-3 py-1.5 text-xs font-semibold text-[#16384C] transition-colors hover:bg-[#C9A45D]/10"
            >
              Thử lại
            </button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-2 py-6 text-center">
            <p className="text-xs text-[#16384C]/50">Chưa có hội thoại nào.</p>
            <button
              type="button"
              onClick={onNewSession}
              className="mt-3 rounded-sm border border-[#C9A45D]/60 px-3 py-1.5 text-xs font-semibold text-[#16384C] transition-colors hover:bg-[#C9A45D]/10"
            >
              Bắt đầu hội thoại mới
            </button>
          </div>
        ) : (
          <ul className="space-y-1">
            {sessions.map((session) => (
              <li key={session.session_id}>
                <button
                  type="button"
                  onClick={() => void selectSession(session)}
                  disabled={loading}
                  className="w-full rounded-sm px-2 py-2 text-left transition-colors hover:bg-[#F8F7F3] disabled:opacity-50"
                >
                  <span className="flex items-start gap-2">
                    <MessageSquareText
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A45D]"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-[#16384C]">
                        {session.title || "Hội thoại"}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#16384C]/50">
                        {relativeTime(session.last_active_at)}
                        {session.message_count > 0 ? ` · ${session.message_count} tin nhắn` : ""}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#E8E5DF] px-4 py-2">
        <span className="flex items-center gap-1.5 text-xs text-[#16384C]/40">
          <History className="h-3.5 w-3.5" aria-hidden="true" />
          Lịch sử theo thiết bị này
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNewSession}
            className="text-xs font-semibold text-[#16384C] transition-colors hover:text-[#5C8269]"
          >
            Hội thoại mới
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#C9A45D] transition-colors hover:text-[#16384C]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

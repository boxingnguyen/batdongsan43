"use client";
import React from "react";

import type { ReactNode } from "react";

/**
 * AssistantWelcome — the deterministic first-open greeting. Uses verbatim copy
 * from the GA-05 ticket (no API call), so the panel feels immediate and works
 * before any backend is wired (spec §Greeting copy + Performance rule:
 * "welcome_does_not_require_network_query").
 */
export interface AssistantWelcomeProps {
  /** Primary action: opens the project list / composer flow. */
  onStart?: () => void;
  /** Children rendered beneath the trust line (e.g. ProjectChoiceList). */
  children?: ReactNode;
}

export function AssistantWelcome({ onStart, children }: AssistantWelcomeProps) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-3 text-center">
        <p className="font-serif text-[17px] leading-relaxed text-[#4E453E]">
          Chào bạn, tôi là Ethereal Concierge AI — trợ lý tư vấn bất động sản
          của Ethereal Estate.
        </p>
        <p className="font-hanken text-[14px] leading-relaxed text-[#4E453E]">
          Hiện tôi đang hỗ trợ thông tin cho một số dự án đang mở bán.
          Bạn có thể chọn dự án bên dưới hoặc nhập tên dự án/câu hỏi cụ thể;
          tôi sẽ tra cứu đúng dữ liệu trước khi trả lời.
        </p>
      </div>

      {children ? <div className="pt-1">{children}</div> : null}

      {onStart ? (
        <button
          type="button"
          onClick={onStart}
          className="self-center rounded-full bg-[#4A3829] px-6 py-3 font-hanken text-[14px] font-semibold text-[#FFFFFF] transition-colors hover:bg-[#634F3F]"
        >
          Bắt đầu hỏi
        </button>
      ) : null}

      <p className="text-center text-[11px] text-[#81756C]">
        Thông tin được tổng hợp từ dữ liệu dự án và mang tính tham khảo.
      </p>
    </div>
  );
}
"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import toast, { Toast } from "react-hot-toast";
import { Users, CheckCircle2, PhoneCall, X } from "lucide-react";

// Fake Data pools for VI and EN
const VI_NAMES = [
  "Hoàng", "Hoang", "Tuấn", "Tuan", "Lan", "Minh", "Phương", "Phuong",
  "Hương", "Huong", "Dũng", "Dung", "Mai", "Khánh", "Khanh", "Linh",
  "Nam", "Thảo", "Thao", "Khoa", "Quỳnh", "Quynh", "Hải", "Hai",
  "Trang", "Đức", "Duc", "Hùng", "Hung", "Phong", "Sơn", "Son",
  "Thắng", "Thang", "Giang", "Vy", "Anh", "Quân", "Quan", "Huy", "Thịnh"
];

const EN_NAMES = [
  "David", "Sarah", "John", "Emily", "Michael",
  "Jessica", "Robert", "Amanda", "James", "Jennifer",
  "William", "Elizabeth", "Alex", "Nicole", "Thomas"
];

const PHONES = [
  "090***678", "098***432", "091***890", "093***124", "097***357",
  "086***951", "094***862", "089***753", "092***147", "083***248"
];

interface ToastLayoutProps {
  toastObj: Toast;
  icon: React.ReactNode;
  iconBg: string;
  message: React.ReactNode;
  timeText: string;
  badge?: React.ReactNode;
}

// Custom Toast Layout matching codebase light-theme footer UI
const ToastLayout = ({ toastObj, icon, iconBg, message, timeText, badge }: ToastLayoutProps) => {
  return (
    <div
      className={`max-w-sm w-full bg-[#f3ece6]/95 backdrop-blur-md border-t-2 border-[#C8A96E] border-x border-b border-[#d2c4bb]/60 shadow-2xl rounded-sm pointer-events-auto flex items-center p-4 gap-3.5 transition-all duration-300 ease-in-out transform ${
        toastObj.visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      <div className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-sm ${iconBg} relative`}>
        {badge}
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-[#4e453e] leading-snug">
          {message}
        </div>
        <p className="text-[11px] text-[#4e453e]/60 mt-0.5 font-light">
          {timeText}
        </p>
      </div>
      <button
        onClick={() => toast.dismiss(toastObj.id)}
        className="flex-shrink-0 text-[#4e453e]/40 hover:text-[#4a3829] transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Subcomponent for fluctuating viewer count to create FOMO effect
const ActiveViewersMessage = ({
  initialCount,
  isEn,
  isProjectPage,
}: {
  initialCount: number;
  isEn: boolean;
  isProjectPage: boolean;
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      setCount((prev) => {
        // Randomly add/subtract 1 or 2
        const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const nextCount = prev + change;
        // Keep within a realistic range (12 to 48)
        return Math.max(12, Math.min(48, nextCount));
      });

      // Random delay between 800ms and 2500ms
      const nextDelay = Math.floor(Math.random() * 1700) + 800;
      timeoutId = setTimeout(tick, nextDelay);
    };

    const initialDelay = Math.floor(Math.random() * 1700) + 800;
    timeoutId = setTimeout(tick, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isEn) {
    return (
      <>
        There are <span className="font-bold text-[#C8A96E] transition-all duration-500 ease-in-out">{count}</span> people viewing this {isProjectPage ? "project" : "page"}.
      </>
    );
  }

  return (
    <>
      Có <span className="font-bold text-[#C8A96E] transition-all duration-500 ease-in-out">{count}</span> người đang xem {isProjectPage ? "dự án" : "trang"} này.
    </>
  );
};

export default function FakeSocialProof() {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const [mounted, setMounted] = useState(false);
  const activeToastsRef = useRef<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isEn = locale === "en";

    const registerToastId = (id: string) => {
      activeToastsRef.current = activeToastsRef.current.filter((x) => x !== id);
      activeToastsRef.current.push(id);
      if (activeToastsRef.current.length > 3) {
        const oldestId = activeToastsRef.current.shift();
        if (oldestId) {
          toast.dismiss(oldestId);
        }
      }
    };

    // 1. Viewer count toast
    const showViewingToast = () => {
      const initialCount = Math.floor(Math.random() * 34) + 12; // 12 to 45
      const isProjectPage = pathname.includes("/projects/") || pathname.includes("/apartment/");
      
      const message = (
        <ActiveViewersMessage
          initialCount={initialCount}
          isEn={isEn}
          isProjectPage={isProjectPage}
        />
      );

      const id = toast.custom(
        (toastObj) => (
          <ToastLayout
            toastObj={toastObj}
            icon={<Users className="w-5 h-5 text-[#C8A96E]" />}
            iconBg="bg-[#C8A96E]/10"
            message={message}
            timeText={isEn ? "Updated just now" : "Cập nhật vừa xong"}
            badge={
              <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A96E]"></span>
              </span>
            }
          />
        ),
        { id: "viewing-toast", position: "bottom-left", duration: 5000 }
      );
      registerToastId(id);
    };

    // 2. Submission count toast
    const showTodaySubmissionsToast = () => {
      const count = Math.floor(Math.random() * 8) + 6; // 6 to 13
      
      let message;
      if (isEn) {
        message = (
          <>
            <span className="font-bold text-[#C8A96E]">{count}</span> customers have submitted contact details today.
          </>
        );
      } else {
        message = (
          <>
            Có <span className="font-bold text-[#C8A96E]">{count}</span> khách hàng đã gửi thông tin liên hệ hôm nay.
          </>
        );
      }

      const id = toast.custom(
        (toastObj) => (
          <ToastLayout
            toastObj={toastObj}
            icon={<CheckCircle2 className="w-5 h-5 text-[#C8A96E]" />}
            iconBg="bg-[#C8A96E]/10"
            message={message}
            timeText={isEn ? "Today's activity" : "Hoạt động hôm nay"}
          />
        ),
        { id: "submissions-toast", position: "bottom-left", duration: 5000 }
      );
      registerToastId(id);
    };

    // 3. Individual customer lead toast
    const showRandomLeadToast = () => {
      const names = isEn ? EN_NAMES : VI_NAMES;
      const name = names[Math.floor(Math.random() * names.length)];
      const phone = PHONES[Math.floor(Math.random() * PHONES.length)];
      
      const isJustNow = Math.random() > 0.4;
      let message;
      let timeText = "";
      
      if (isJustNow) {
        if (isEn) {
          message = (
            <>
              <span className="font-bold text-[#C8A96E]">{name}</span>{" "}
              <span className="text-slate-400 font-mono text-xs">({phone})</span>{" "}
              just submitted contact details.
            </>
          );
          timeText = "Just now";
        } else {
          message = (
            <>
              <span className="font-bold text-[#C8A96E]">{name}</span>{" "}
              <span className="text-slate-400 font-mono text-xs">({phone})</span>{" "}
              vừa gửi yêu cầu liên hệ.
            </>
          );
          timeText = "Vừa xong";
        }
      } else {
        const minutes = Math.floor(Math.random() * 15) + 2; // 2 to 16 minutes
        if (isEn) {
          message = (
            <>
              <span className="font-bold text-[#C8A96E]">{name}</span>{" "}
              <span className="text-slate-400 font-mono text-xs">({phone})</span>{" "}
              registered for consultation <span className="font-bold text-[#C8A96E]">{minutes}m</span> ago.
            </>
          );
          timeText = "Recent activity";
        } else {
          message = (
            <>
              <span className="font-bold text-[#C8A96E]">{name}</span>{" "}
              <span className="text-slate-400 font-mono text-xs">({phone})</span>{" "}
              vừa đăng ký nhận thông tin tư vấn cách đây <span className="font-bold text-[#C8A96E]">{minutes} phút</span>.
            </>
          );
          timeText = "Hoạt động gần đây";
        }
      }

      const id = toast.custom(
        (toastObj) => (
          <ToastLayout
            toastObj={toastObj}
            icon={<PhoneCall className="w-5 h-5 text-[#C8A96E]" />}
            iconBg="bg-[#C8A96E]/10"
            message={message}
            timeText={timeText}
          />
        ),
        { position: "bottom-left", duration: 5000 }
      );
      registerToastId(id);
    };

    // --- TIMING CYCLE TRIGGER ---
    // First Toast: Active viewers count at 8s
    const timer1 = setTimeout(() => {
      showViewingToast();
    }, 8000);

    // Second Toast: Today's lead submission count at 30s
    const timer2 = setTimeout(() => {
      showTodaySubmissionsToast();
    }, 30000);

    // Third Toast & Loop: Individual submissions starting at 50s, repeated every 120s (2 minutes)
    const timer3 = setTimeout(() => {
      showRandomLeadToast();

      const interval = setInterval(() => {
        const r = Math.random();
        if (r < 0.25) {
          showViewingToast();
        } else if (r < 0.45) {
          showTodaySubmissionsToast();
        } else {
          showRandomLeadToast();
        }
      }, 120000);

      return () => clearInterval(interval);
    }, 20000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      activeToastsRef.current.forEach((id) => toast.dismiss(id));
      activeToastsRef.current = [];
    };
  }, [mounted, locale, pathname]);

  if (!mounted) return null;

  return null;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sun FourS Tower Đà Nẵng | Tâm điểm an cư phía Nam",
  description:
    "Sun FourS Tower — 4 tháp căn hộ cao cấp tại Sun Riverpolis, phía Nam Đà Nẵng. 1.281 căn hộ, kính cong panorama, hồ bơi 4 mùa. Chỉ từ 1,5 tỷ. Đăng ký nhận bảng giá.",
};

export default function SunFoursTowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

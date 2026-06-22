import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S-Light Tower Đà Nẵng | Tháp đôi biểu tượng Nam Đà Nẵng",
  description:
    "S-Light Tower — tháp đôi 22 tầng biểu tượng tại Sun NeO City, Nam Đà Nẵng. Gần 800 căn hộ, tầm nhìn 360° sông Hàn - núi - biển - pháo hoa DIFF. Pháp lý lâu dài. Đăng ký nhận thông tin.",
};

export default function SLightTowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sun Symphony Residence 5 | Duyên Hải Holding",
  description:
    "Sun Symphony Residence 5 — căn hộ hiếm hoi sở hữu bộ tứ tầm view Sông Hàn, pháo hoa, biển và núi. Đầu tư dòng tiền và second home tại Đà Nẵng.",
};

export default function Symphony5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
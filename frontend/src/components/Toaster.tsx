"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const FakeSocialProof = dynamic(() => import("./FakeSocialProof"), {
  ssr: false,
});

export default function Toaster() {
  return (
    <>
      <HotToaster position="top-right" />
      <FakeSocialProof />
    </>
  );
}


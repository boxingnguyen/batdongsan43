"use client";

import { useEffect } from "react";

export function HideSiteHeader() {
  useEffect(() => {
    document.body.classList.add("symphony5-page");
    return () => document.body.classList.remove("symphony5-page");
  }, []);
  return null;
}
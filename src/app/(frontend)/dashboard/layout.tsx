"use client";

import { Newsletter } from "@/components/screens/landing/Newsletter";

export default function AssetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Newsletter />
    </>
  );
}

"use client";

import { Newsletter } from "@/components/screens/Landing/Newsletter";

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

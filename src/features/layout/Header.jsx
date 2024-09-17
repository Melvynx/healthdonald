"use client";

import Image from "next/image";
import { HeaderCart } from "../cart/HeaderCart";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 border-b px-4 pb-2">
      <Image src="/h-logo.png" alt="Healthdonald Logo" width={50} height={50} />
      <span className="font-semibold">Healthdonals</span>
      <HeaderCart />
    </header>
  );
};

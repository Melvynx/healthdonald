"use client";

import { useUserStore } from "@/lib/store/user-store";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderCart } from "../cart/HeaderCart";

export const Header = () => {
  const userName = useUserStore((state) => state.userName);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="flex items-center gap-2 border-b px-4 pb-2">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/healthdonals.png"
          alt="Healthdonald Logo"
          width={50}
          height={50}
        />
        <span className="font-semibold">Healthdonals</span>
      </Link>
      <div className="ml-auto"></div>
      {userName ? (
        <div className="flex items-center gap-2" onClick={() => logout()}>
          <User size={16} />
          <span className="font-semibold">{userName}</span>
        </div>
      ) : (
        <div></div>
      )}
      <HeaderCart />
    </header>
  );
};

"use client";

import { FooterCart } from "@/features/cart/FooterCart";
import { CategoriesList } from "@/features/categories/CategoriesList";
import { ItemsList } from "@/features/items/ItemsList";
import { useUserStore } from "@/lib/store/user-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const userName = useUserStore((state) => state.userName);
  const router = useRouter();

  if (!userName) {
    router.push("/login");
  }

  return (
    <div className="flex max-h-full flex-col overflow-hidden px-4">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <CategoriesList />
        <ItemsList />
      </div>
      <FooterCart />
    </div>
  );
}

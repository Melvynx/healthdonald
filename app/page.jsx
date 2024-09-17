"use client";

import { FooterCart } from "@/features/cart/FooterCart";
import { ItemsList } from "@/features/items/ItemsList";

export default function Home() {
  return (
    <div className="h-full px-4">
      <ItemsList />
      <FooterCart />
    </div>
  );
}

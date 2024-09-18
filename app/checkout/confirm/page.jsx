"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { Check } from "lucide-react";

export default function Checkout() {
  useCartStore.setState({ items: {} });
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4">
      <Check size={32} className="text-primary" />
      <p className="text-2xl font-bold">Yeah ! Your order is confirmed</p>
    </div>
  );
}

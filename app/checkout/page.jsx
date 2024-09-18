"use client";

import { buttonVariants } from "@/components/ui/button";
import { FullCart } from "@/features/cart/FullCart";
import { Item } from "@/features/items/Item";
import { getItems } from "@/lib/items/get-items";
import { useCartStore } from "@/lib/store/cart-store";
import Link from "next/link";
import useSWR from "swr";

export default function Checkout() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <FullCart />
      <UpSellDessert />
      <Link
        href="/checkout/confirm"
        className={buttonVariants({ size: "lg", className: "w-full" })}
      >
        Confirm your order
      </Link>
    </div>
  );
}

export function UpSellDessert() {
  const items = useCartStore((state) => state.items);

  const categoryId = "dessert";
  const { data } = useSWR(`/categories/${categoryId}`, async () => {
    const items = await getItems(categoryId);
    console.log({ items });
    return items;
  });

  if (Object.values(items).some((item) => item.item.category === categoryId)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">Would you like to try our dessert?</p>
      <div className="flex w-full gap-4 overflow-x-auto">
        {data?.map((d) => (
          <Item className="h-fit w-32 shrink-0 grow" key={d.id} item={d} />
        ))}
      </div>
    </div>
  );
}

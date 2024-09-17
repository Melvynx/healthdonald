import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/price";
import {
  useCartStore,
  useTotalItems,
  useTotalPrice,
} from "@/lib/store/cart-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CartLine } from "./CartLine";

export const FooterCart = () => {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-lg border bg-card p-6 shadow-md">
      <Button
        variant="ghost"
        size="sm"
        className="absolute inset-x-4 top-0 flex items-center justify-center hover:bg-transparent"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronDown className="size-6" />
        ) : (
          <ChevronUp className="size-6" />
        )}
      </Button>

      {open ? (
        <>
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold">Cart</p>
            <p className="ml-auto text-lg font-bold">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <div className="flex max-h-40 flex-col gap-2 overflow-auto py-4">
            {Object.values(items).map((item) => (
              <CartLine
                item={item.item}
                quantity={item.quantity}
                key={item.id}
              />
            ))}
          </div>
        </>
      ) : null}
      {open ? (
        <Button className="w-full">Checkout</Button>
      ) : (
        <div className="flex items-center gap-4">
          <Button className="w-full">Checkout</Button>
          <p className="ml-auto text-lg font-bold">{formatPrice(totalPrice)}</p>
        </div>
      )}
    </div>
  );
};

import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/price";
import { useTotalItems, useTotalPrice } from "@/lib/store/cart-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FullCart } from "./FullCart";

export const FooterCart = () => {
  const [open, setOpen] = useState(false);
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <div className="h-32"></div>
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

        {open ? <FullCart cartLineClassName="max-h-40" /> : null}
        {open ? (
          <Link
            className={buttonVariants({ size: "lg", className: "w-full" })}
            href="/checkout"
          >
            Checkout
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              className={buttonVariants({ size: "lg", className: "w-full" })}
              href="/checkout"
            >
              Checkout
            </Link>
            <p className="ml-auto text-lg font-bold">
              {formatPrice(totalPrice)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

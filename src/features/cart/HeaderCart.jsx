import { buttonVariants } from "@/components/ui/button";
import { useTotalItems } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export const HeaderCart = () => {
  const totalItems = useTotalItems();
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "flex items-center gap-2"
      )}
      href="/checkout"
    >
      {totalItems}
      <ShoppingBasket className="size-4" />
    </Link>
  );
};

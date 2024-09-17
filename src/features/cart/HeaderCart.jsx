import { Button } from "@/components/ui/button";
import { useTotalItems } from "@/lib/store/cart-store";
import { ShoppingBasket } from "lucide-react";

export const HeaderCart = () => {
  const totalItems = useTotalItems();
  return (
    <Button
      size="sm"
      variant="outline"
      className="ml-auto flex items-center gap-2"
    >
      {totalItems}
      <ShoppingBasket className="size-4" />
    </Button>
  );
};

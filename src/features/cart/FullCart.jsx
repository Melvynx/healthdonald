import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatPrice } from "@/lib/price";
import { useCartStore, useTotalPrice } from "@/lib/store/cart-store";
import { Rabbit } from "lucide-react";
import { CartLine } from "./CartLine";
import { cn } from "@/lib/utils";

export const FullCart = ({ cartLineClassName }) => {
  const items = useCartStore((state) => state.items);
  const totalPrice = useTotalPrice();

  if (Object.values(items).length === 0) {
    return (
      <Alert>
        <Rabbit size={22} />
        <AlertTitle>Your cart is empty</AlertTitle>
        <AlertDescription>
          Come back when you add something to your cart
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <p className="text-lg font-bold">Cart</p>
        <p className="ml-auto text-lg font-bold">{formatPrice(totalPrice)}</p>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 overflow-auto py-4",
          cartLineClassName
        )}
      >
        {Object.values(items).map((item) => (
          <CartLine item={item.item} quantity={item.quantity} key={item.id} />
        ))}
      </div>
    </div>
  );
};

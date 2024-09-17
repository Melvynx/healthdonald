/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/price";
import { useCartStore } from "@/lib/store/cart-store";

export const Item = ({ item }) => {
  return (
    <Card className="p-2">
      <img src={item.image} className="aspect-square w-full rounded-md" />
      <p className="text-lg font-bold">{item.name}</p>
      <div className="flex items-center gap-2">
        <p className="font-mono font-bold">{formatPrice(item.price)}</p>
        <div className="ml-auto" />
        <ItemAddButton item={item} />
      </div>
    </Card>
  );
};

const ItemAddButton = ({ item }) => {
  const currentItem = useCartStore((state) => state.items[item.id]);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!currentItem) {
    return (
      <Button size="sm" className="ml-auto" onClick={() => addItem(item)}>
        Add
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={() => removeItem(item)}>
        -
      </Button>
      <p className="aspect-square w-6 text-center">{currentItem.quantity}</p>
      <Button variant="ghost" size="sm" onClick={() => addItem(item)}>
        +
      </Button>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Minus, Plus } from "lucide-react";

export const ItemAddButton = ({ item }) => {
  const currentItem = useCartStore((state) => state.items[item.id]);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!currentItem) {
    return (
      <Button size="sm" onClick={() => addItem(item)}>
        Add
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={() => removeItem(item)}>
        <Minus size={16} />
      </Button>
      <p className="aspect-square w-6 text-center">{currentItem.quantity}</p>
      <Button variant="ghost" size="sm" onClick={() => addItem(item)}>
        <Plus size={16} />
      </Button>
    </div>
  );
};

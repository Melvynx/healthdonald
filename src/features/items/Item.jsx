import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteItem } from "@/lib/items/delete-item";
import { formatPrice } from "@/lib/price";
import { useCartStore } from "@/lib/store/cart-store";
import { useUserStore } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";

export const Item = ({ item, className }) => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  return (
    <div
      className={cn("relative rounded-md border p-3 shadow-inner", className)}
    >
      <p className="absolute right-2 top-2 font-mono font-bold">
        {formatPrice(item.price)}
      </p>
      <img src={item.image} className="aspect-square w-full rounded-md" />
      <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
      <div className="flex w-full items-end justify-end">
        <ItemAddButton item={item} />
      </div>
      {isAdmin ? (
        <div className="mt-2 flex w-full justify-end">
          <Link
            href={`/items/${item.id}`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <Edit size={16} />
          </Link>
          <DeleteItemButton item={item} />
        </div>
      ) : null}
    </div>
  );
};

export const DeleteItemButton = ({ item }) => {
  const onDelete = async () => {
    await deleteItem(item.id);
    mutate((key) => typeof key === "string" && key.startsWith("/categories/"));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" variant="outline">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {item.name} ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ItemAddButton = ({ item }) => {
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
        -
      </Button>
      <p className="aspect-square w-6 text-center">{currentItem.quantity}</p>
      <Button variant="ghost" size="sm" onClick={() => addItem(item)}>
        +
      </Button>
    </div>
  );
};

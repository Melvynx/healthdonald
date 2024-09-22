import { formatPrice } from "@/lib/price";
import { useIsAdminEnabled } from "@/lib/store/admin-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Edit } from "lucide-react";
import { ItemAddButton } from "./ItemAddButton";
import { DeleteItemButton } from "./DeleteItemButton";
import { buttonVariants } from "@/components/ui/button";

export const Item = ({ item, className }) => {
  const isAdmin = useIsAdminEnabled();
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

import { formatPrice } from "@/lib/price";

/* eslint-disable @next/next/no-img-element */
export const CartLine = ({ item, quantity = 0 }) => {
  return (
    <div className="flex items-center gap-4">
      <ItemImageCard quantity={quantity} imageUrl={item.image} />
      <p className="text-lg font-semibold">{item.name}</p>
      <div className="ml-auto"></div>
      <p className="font-mono">{formatPrice(item.price * quantity)}</p>
    </div>
  );
};

export const ItemImageCard = ({ quantity = 0, imageUrl }) => {
  return (
    <div className="relative size-16 rounded-md border border-zinc-300 bg-zinc-100 p-1">
      <img src={imageUrl} alt="ac adapter" className="size-full" />
      {quantity ? (
        <span className="absolute -right-2 -top-2 flex  size-5 items-center justify-center rounded-full bg-black/50 text-xs text-white">
          {quantity}
        </span>
      ) : null}
    </div>
  );
};

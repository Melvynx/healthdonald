import { getItems } from "@/lib/items/get-items";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Item } from "./Item";

export const ItemsList = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then((items) => setItems(items));
  }, []);

  if (!items) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

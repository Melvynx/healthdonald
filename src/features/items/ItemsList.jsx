import { Skeleton } from "@/components/ui/skeleton";
import { getItems } from "@/lib/items/get-items";
import { useCategoryStore } from "@/lib/store/category-store";
import useSWR from "swr";
import { Item } from "./Item";

export const ItemsList = () => {
  const categoryId = useCategoryStore((s) => s.currentCategoryId);

  const { data, isLoading } = useSWR(`/categories/${categoryId}`, async () => {
    const items = await getItems(categoryId);
    return items;
  });

  if (!data || isLoading) {
    return (
      <div className="grid flex-1 grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full max-h-[80vh] flex-1 grid-cols-2 gap-4 overflow-x-auto">
      {data.map((item) => (
        <div key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

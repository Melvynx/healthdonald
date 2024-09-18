import { useCategoryStore } from "@/lib/store/category-store";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "./categories.data";

export const CategoriesList = () => {
  const { currentCategoryId, setCurrentCategoryId } = useCategoryStore();
  return (
    <div className="flex w-full max-w-20 flex-col gap-2">
      {CATEGORIES.map((category) => (
        <button
          className={cn(
            "p-2 w-full aspect-square flex items-center justify-center flex-col border rounded-md",
            {
              "bg-accent text-accent-foreground":
                category.id === currentCategoryId,
            }
          )}
          key={category.id}
          onClick={() => {
            setCurrentCategoryId(category.id);
          }}
        >
          <img
            src={category.logo}
            className="aspect-square size-8 w-full rounded-md object-contain"
          />
          <span className="text-xs">{category.title}</span>
        </button>
      ))}
    </div>
  );
};

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
import { Button } from "@/components/ui/button";
import { deleteItem } from "@/lib/items/delete-item";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";

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

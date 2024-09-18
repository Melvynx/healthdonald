"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES } from "@/features/categories/categories.data";
import { FirebaseImageUpload } from "@/features/firebase-image-upload/FirebaseImageUpload";
import { getItem } from "@/lib/items/get-item";
import { setItem } from "@/lib/items/set-item";
import { parseId } from "@/lib/parse-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";

import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});

export default function ItemPage({ params }) {
  const { data } = useSWR(`/items/${params.itemId}`, async () => {
    if (params === "new") return null;
    const item = await getItem(params.itemId);
    return item;
  });

  if (params.itemId === "new") {
    return <ItemForm />;
  }

  if (!data) {
    return (
      <div className="px-4">
        <Skeleton className="aspect-square w-full" />
      </div>
    );
  }

  return (
    <ItemForm
      defaultItem={{
        ...data,
        price: data.price / 100,
      }}
    />
  );
}

const ItemForm = ({ defaultItem }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultItem,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const ID = defaultItem?.id ?? values.id;
      await setItem(ID, {
        ...(defaultItem ? defaultItem : {}),
        ...values,
        price: values.price * 100,
        id: ID,
      });
      router.push("/");
    } catch (err) {
      console.log({ err });
      toast.error("Error creating item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4">
      <h2 className="mb-4 text-xl font-bold">Add a new item</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter item name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      const value = e.target.value;
                      if (!defaultItem) {
                        form.setValue("id", parseId(value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!defaultItem ? (
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={category.logo}
                              alt="category logo"
                              className="size-6 rounded-md"
                            />
                            {category.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter item price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <FirebaseImageUpload
                    image={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

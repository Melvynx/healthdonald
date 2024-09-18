"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/user-store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const setUsername = useUserStore((state) => state.setUserName);
  const router = useRouter();
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 px-4 pt-4">
      <div className="absolute left-4 top-4 rotate-12">
        <img src="/categories/burger.png" alt="Burger" width={50} height={50} />
      </div>
      <div className="absolute right-4 top-4 -rotate-12">
        <img
          src="/categories/nuggets.png"
          alt="Nuggets"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute bottom-4 left-4 -rotate-6">
        <img src="/categories/fries.png" alt="Fries" width={50} height={50} />
      </div>
      <div className="absolute bottom-4 right-4 rotate-6">
        <img
          src="/categories/dessert.png"
          alt="Dessert"
          width={50}
          height={50}
        />
      </div>
      <h1 className="text-2xl font-bold">Welcome to Healthdonals !</h1>
      <p>Login first to access our application.</p>
      <form
        className="flex items-center gap-2"
        action={(formData) => {
          const name = formData.get("name");
          setUsername(name);
          router.push("/");
        }}
      >
        <Input name="name" placeholder="Enter your name" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

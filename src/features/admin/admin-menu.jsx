"use client";

import { buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useAdminStore } from "@/lib/store/admin-store";
import { useUserStore } from "@/lib/store/user-store";
import Link from "next/link";

export const AdminMenu = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const { toggleIsAdminEnabled, adminEnabled } = useAdminStore();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 rounded-md border bg-card p-4">
      <Link className={buttonVariants({ size: "sm" })} href="/items/new">
        New
      </Link>
      <Toggle
        pressed={adminEnabled}
        onPressedChange={() => {
          toggleIsAdminEnabled();
        }}
        aria-label="Toggle bold"
      >
        Admin
      </Toggle>
    </div>
  );
};

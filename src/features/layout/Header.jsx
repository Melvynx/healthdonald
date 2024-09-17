import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="px-4 border-b pb-2 flex items-center gap-2">
      <Image src="/h-logo.png" alt="Healthdonald Logo" width={50} height={50} />
      <span className="font-semibold">Healthdonals</span>
      <Button size="sm" variant="outline" className="ml-auto">
        <ShoppingBasket className="size-4" />
      </Button>
    </header>
  );
};

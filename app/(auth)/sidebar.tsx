"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  BarChart,
  ChevronUp,
  CogIcon,
  CreditCard,
  Library,
  Package2,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: BarChart },
  { href: "/products", label: "Products", icon: ShoppingBasket },
  { href: "/sales", label: "Sales", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: CogIcon },
  { href: "/library", label: "Library", icon: Library },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex h-14 mb-4 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="size-6" />
          <span>Next Storefront</span>
        </Link>
      </div>

      <div>
        <nav className="grid gap-1 px-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: pathname === link.href ? "default" : "ghost",
                }),
                "justify-start",
                pathname !== link.href && "hover:bg-zinc-200",
              )}
            >
              <link.icon className="mr-2 size-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <div className="flex h-14 pt-2 items-center border-t px-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://avatar.vercel.sh/asdf" />
                  </Avatar>
                  <div className="flex flex-col items-start w-[150px] truncate">
                    <p className="text-sm font-medium text-zinc-950">
                      First Name
                    </p>
                    <p className="text-xs font-normal text-zinc-500">
                      Email Address
                    </p>
                  </div>
                </div>
                <ChevronUp className="size-4 ml-2 text-zinc-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[220px] mb-4" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

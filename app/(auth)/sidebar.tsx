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
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  BarChart,
  ChevronUp,
  Cog,
  CreditCard,
  Library,
  Package2,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: BarChart,
  },
  {
    href: "/products",
    label: "Products",
    icon: ShoppingBasket,
  },
  {
    href: "/sales",
    label: "Sales",
    icon: CreditCard,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Cog,
  },
  {
    href: "/library",
    label: "Library",
    icon: Library,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between h-full gap-4 py-2">
      <div>
        <div className="flex h-14 mb-4 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="size-6" />
            <span>Next Storefront</span>
          </Link>
        </div>

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

      <div className="flex h-14 pt-2 items-center border-t px-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName} />
                </Avatar>
                <div className="flex flex-col items-start w-[150px] truncate">
                  <p className="text-sm font-medium text-zinc-950">
                    {user?.fullName}
                  </p>
                  <p className="text-xs font-normal text-zinc-500">
                    {user?.emailAddresses[0].emailAddress}
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
            <SignOutButton redirectUrl="/sign-in">
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

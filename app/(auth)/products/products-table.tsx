"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { CustomImage } from "@/components/custom-image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteProductDialog } from "@/app/(auth)/products/delete-product-dialog";

type Props = {
  products: (Doc<"products"> & {
    sales: number;
    revenue: number;
    user: Doc<"users">;
  })[];
};

export function ProductsTable({ products }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead className="hidden md:table-cell">Revenue</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell className="hidden sm:table-cell">
              <CustomImage src={product.coverImage} alt={product.name} />
            </TableCell>
            <TableCell className="font-medium">
              <div>{product.name}</div>
              <Link
                href={`/${product?.user.username}/${product._id}`}
                target="_blank"
              >
                <span className="text-xs underline">Preview</span>
              </Link>
            </TableCell>
            <TableCell>{product.sales}</TableCell>
            <TableCell className="hidden md:table-cell">
              {formatPrice({ price: product.revenue })}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatPrice({ price: product.price })}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant={product.published ? "default" : "outline"}>
                {product.published ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell>
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/products/edit/${product._id}`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteProductDialog product={product} />
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

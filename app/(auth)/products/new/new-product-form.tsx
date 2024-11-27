"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useUploadFile } from "@/lib/useUploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProductSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  price: z.string(),
  description: z.string(),
  coverImage: z.string(),
  content: z.string(),
  published: z.boolean(),
});

type NewProductFormValues = z.infer<typeof newProductSchema>;

export function NewProductForm() {
  const router = useRouter();
  const createProduct = useMutation(api.products.createProduct);
  const uploadFile = useUploadFile();
  const form = useForm<NewProductFormValues>({
    resolver: zodResolver(newProductSchema),
    mode: "onChange",
    defaultValues: {
      coverImage: "",
      content: "",
      published: false,
    },
  });

  async function onSubmit(values: NewProductFormValues) {
    const price = Number(Number(values.price).toFixed(2));

    if (price < 1) {
      form.setError("price", { message: "Price must be at least $1" });
      return;
    }

    await createProduct({
      name: values.name,
      price: price,
      description: values.description,
      coverImage: values.coverImage,
      content: values.content,
      published: values.published,
    });
    toast({ description: "Product created" });
    router.push("/products");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form className="space-y-8 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const fileUrl = await uploadFile(event.target.files[0]);
                    field.onChange(fileUrl);
                  }}
                />
              </FormControl>
              {field.value && (
                <img
                  src={field.value}
                  alt="Cover Image"
                  className="w-full object-cover h-36 border rounded-md border-dashed"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
                    <Input
                      value={field.value}
                      step={0.01}
                      type="number"
                      className="pl-8"
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <div className="items-top flex space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                  <FormLabel>Publish product</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Make product available for purchase
                  </p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create product</Button>
      </form>
    </Form>
  );
}

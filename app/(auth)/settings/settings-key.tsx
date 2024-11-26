"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { CheckIcon, KeyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  stripeSecretKey: Doc<"keys">;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const settingsKeySchema = z.object({
  stripeKey: z.string().min(32),
});

type SettingsKeyFormValues = z.infer<typeof settingsKeySchema>;

export function SettingsKey({ stripeSecretKey, open, setOpen }: Props) {
  const createStripeSecretKey = useMutation(api.keys.createStripeSecretKey);
  const router = useRouter();

  const form = useForm<SettingsKeyFormValues>({
    resolver: zodResolver(settingsKeySchema),
    defaultValues: {
      stripeKey: stripeSecretKey?.stripeKey,
    },
    mode: "onChange",
  });

  async function onSubmit(
    values: SettingsKeyFormValues,
    event: React.SyntheticEvent<HTMLFormElement>
  ) {
    event.stopPropagation();
    await createStripeSecretKey({ stripeKey: values.stripeKey });
    toast({ description: "Stripe key updated" });
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-8" asChild>
        <Button variant="outline">
          {stripeSecretKey ? (
            <CheckIcon className="size-4 mr-2" />
          ) : (
            <KeyIcon className="size-4 mr-2" />
          )}
          Stripe Secret Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stripe Secret Key</DialogTitle>
          <DialogDescription>
            Add your Stripe key here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="stripeKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="sk_1234567890"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

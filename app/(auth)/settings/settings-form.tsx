'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Doc } from '@/convex/_generated/dataModel';
import { toast } from '@/components/ui/use-toast';
import { ConvexError } from 'convex/values';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { SettingsLogo } from './settings-logo';

const settingsFormSchema = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters',
    }),
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters',
    }),
    about: z.string().max(500, {
        message: 'About must be less than 500 characters',
    }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

type Props = {
  user: Doc<'users'>;
};

export function SettingsForm({ user }: Props) {
    const updateUser = useMutation(api.users.updateUser);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            ...user,
        },
        mode: 'onChange',
    });

    async function onSubmit(values: SettingsFormValues) {
        try {
            await updateUser({
                username: values.username,
                name: values.name,
                about: values.about,
                userId: user._id,
            });
            toast({ description: 'Settings updated' });
        } catch (error) {
            const message = error instanceof ConvexError ? error.data : '';

            if (message === 'USERNAME_TAKEN') {
                form.setError('username', {
                    message: 'Username taken. Please choose another',
                });
            } else {
                toast({ description: 'Failed to update settings' });
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your store"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SettingsLogo user={user} />
                <Button type="submit">Update settings</Button>
            </form>
        </Form>
    );
}

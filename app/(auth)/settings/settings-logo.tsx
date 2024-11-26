import { CustomImage } from '@/components/custom-image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useUploadFile } from '@/lib/useUploadFile';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

type Props = {
  user: Doc<'users'>;
};

export function SettingsLogo({ user }: Props) {
    const uploadFile = useUploadFile();
    const updateUserLogo = useMutation(api.users.updateUserLogo);
    const router = useRouter();

    async function onImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0];

        if (!file) {
            return toast({
                variant: 'destructive',
                description: 'No image selected',
            });
        }

        const logo = await uploadFile(file);
        await updateUserLogo({ logo, userId: user._id });
        toast({ description: 'Logo updated' });
        router.refresh();
    }

    return (
        <div className="flex items-center gap-3">
            <CustomImage src={user.logo} alt={user.username} size="medium" />
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="logo">Logo</Label>
                <Input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={onImageUpload}
                />
            </div>
        </div>
    );
}

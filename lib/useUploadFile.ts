import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

export function useUploadFile() {
    const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
    const getFileUrl = useMutation(api.storage.getFileUrl);

    async function uploadFile(file: File) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': file.type },
            body: file,
        });
        const { storageId } = await result.json();
        const url = await getFileUrl({ storageId });
        return url;
    }

    return uploadFile;
}

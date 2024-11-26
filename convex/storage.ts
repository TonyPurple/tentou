import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const generateUploadUrl = mutation(async ctx => {
    return await ctx.storage.generateUploadUrl();
});

export const getFileUrl = mutation({
    args: {
        storageId: v.string(),
    },
    handler: (ctx, { storageId }) => {
        return ctx.storage.getUrl(storageId);
    },
});

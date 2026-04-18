import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const saveImage = mutation({
  args: {
    userId: v.string(),
    prompt: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("images", {
      userId: args.userId,
      prompt: args.prompt,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

export const GeneratedImages = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(8);

    const allImages = await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return {
      totalImages: allImages.length,
      recentImages: images,
    };
  },
});

// ✅ Get all images for gallery
export const getAllImages = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return images;
  },
});

// ✅ Delete image
export const deleteImage = mutation({
  args: {
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.imageId);
  },
});
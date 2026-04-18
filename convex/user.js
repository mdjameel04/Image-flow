import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";


const OWNER_EMAIL = "jameeltony67@gmail.com"


export const createNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // ✅ Check using index (optimized)
    const existingUser = await ctx.db
      .query("userTable")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    // ✅ If not found → create
    if (!existingUser) {
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
        subscription: "free",
      credits: 5,                 // ✅ NEW
      lastReset: Date.now(),      // ✅ NEW
        createdAt: Date.now(), // REQUIRED FIELD

      };

      await ctx.db.insert("userTable", userData);
      return userData;
    }

    // ✅ If exists → return
    return existingUser;
  },
});

export const getUserCredits = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.email===OWNER_EMAIL) {
      return {credits: "∞"}
    }
    const user = await ctx.db
      .query("userTable")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user) return null;

    return {
      credits: user.credits,
    };
  },
});
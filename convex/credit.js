import { mutation } from "./_generated/server";
import { v } from "convex/values";

const OWNER_EMAIL = "jameeltony67@gmail.com";

export const useCredit = mutation({
  args: {
    email: v.string(), // we use email (you already have index)
  },
  handler: async (ctx, args) => {

         // ✅ Owner skips credit deduction entirely
    if (args.email === OWNER_EMAIL) {
      return { success: true, unlimited: true };
    }

    const user = await ctx.db
      .query("userTable")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    let credits = user.credits;
    let lastReset = user.lastReset;

    // 🔁 Reset if new day
    if (now - lastReset > oneDay) {
      credits = 5;
      lastReset = now;
    }

    // ❌ No credits left
    if (credits <= 0) {
      throw new Error("No credits left");
    }

    // ✅ Deduct 1 credit
    await ctx.db.patch(user._id, {
      credits: credits - 1,
      lastReset,
    });

    return {
      success: true,
      remaining: credits - 1,
    };
  },
});  
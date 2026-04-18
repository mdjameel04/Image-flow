// convex/schema.js

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userTable: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    subscription: v.optional(v.string()),
    credits : v.number(),
     lastReset: v.number(),  
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  images: defineTable({
    userId: v.string(),
    prompt: v.string(),
    imageUrl: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
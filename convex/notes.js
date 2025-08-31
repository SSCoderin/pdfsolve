import { v } from "convex/values";
import { mutation,query } from "./_generated/server";

export const AddNotes = mutation({
    args: {
        fileId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const recordId = await ctx.db.query("notes")
            .filter((q) => q.eq(q.field('fileId'), args.fileId))
            .collect();

        if (recordId?.length === 0) {
            const newNote = await ctx.db.insert("notes", {
                fileId: args.fileId,
                notes: args.notes,
                createdBy: args.createdBy,
            });
            return newNote;
        } else {
            const updatedNote = await ctx.db.patch(recordId[0]._id, {
                notes: args.notes,
            });
            return updatedNote;
        }
    }
})

export const getNotes = query({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("notes")
            .filter((q) => q.eq(q.field("fileId"), args.fileId))
            .collect();
    
        if (!result || result.length === 0) {
            return null;
        }
        return result[0].notes;
    }
})
import  {v} from "convex/values";
import { mutation } from "./_generated/server";




export const  createuser =mutation({
    args: {
        username: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
       const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), args.email)).collect();


       if (user?.length ==0) {
        await ctx.db.insert("users",{
            username: args.username,
            email: args.email,
            imageUrl: args.imageUrl,
        })
           return "ineserted  new  user successfully"
       }
    },
});
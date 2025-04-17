import { z } from "zod";

export const categorySchema = z.object({
    id: z.string().cuid(),
    name : z.string().min(2,"category name should atleast 2 character"),
})

export const categoryReq = categorySchema.omit({
    id:true
})

export const deleteCategoryType = categorySchema.omit({
    name:true
})

export type categoryType = z.infer<typeof categorySchema>;

const categoryDetailsAdmin = categorySchema.extend({
    count : z.number().nonnegative({message:"count can't be negative"}),
    createdAt : z.date()
})

export type adminCategoryType = z.infer<typeof categoryDetailsAdmin>


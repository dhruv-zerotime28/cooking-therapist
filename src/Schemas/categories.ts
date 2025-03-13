import { z } from "zod";

export const categorySchema = z.object({
    id: z.string().cuid(),
    name : z.string().min(2,"category name should atleast 2 character"),
})

export const categoryReq = categorySchema.omit({
    id:true
})


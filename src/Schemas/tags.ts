import { z } from "zod";

export const tag = z.object({
    id: z.string().cuid(),
    name : z.string().min(2,"tag name should atleast 2 character"),
})

export const tagReq = tag.omit({
    id:true
})

export const deleteTagReqType = tag.omit({
    name:true
})

export type tagType = z.infer<typeof tag>;

const tagsAdminDetails = tag.extend({
    count : z.number().nonnegative({message:"count can't be negative"}),
    createdAt : z.date()
})

export type adminTagsType = z.infer<typeof tagsAdminDetails>
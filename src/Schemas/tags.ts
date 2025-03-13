import { z } from "zod";

export const tag = z.object({
    id: z.string().cuid(),
    name : z.string().min(2,"tag name should atleast 2 character"),
})

export const tagReq = tag.omit({
    id:true
})
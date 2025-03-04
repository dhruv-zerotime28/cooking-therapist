import { z } from "zod";

export const tag = z.object({
    id : z.string(),
    name : z.string(),
})
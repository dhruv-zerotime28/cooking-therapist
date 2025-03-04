import { z } from "zod";

export const categories = z.object({
    id : z.string(),
    name : z.string(),
})


import { z } from "zod";

export const adminManagementTable = z.object({
    id: z.string().uuid(),
    name : z.string(),
    email : z.string().email(),
    createdAt : z.date(),
    createdBy : z.string()
})
export type adminTableType = z.infer<typeof adminManagementTable>

export const addEditAdminScehma = z.object({
    name : z.string(),
    email : z.string().email()
})
export type addEditAdminType = z.infer<typeof addEditAdminScehma>

import { z } from "zod";

export const ContatctUsFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required"),
  });

export type ContactFormValues = z.infer<typeof ContatctUsFormSchema>;


enum status{
  READ,
  UNREAD
}
export interface IContactTableData{
  id:string,
  name:string,
  message:string,
  createdAt : Date,
  email:string
  status:status
}

export const MessageReplySchema = z.object({
    id : z.string(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required"),
    reply : z.string().min(1, "Name is required").max(1200,"reply can't be so long"),
})
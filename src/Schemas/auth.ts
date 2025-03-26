import { TypeOf, z } from "zod";


const emailScehma = z.string().email().nonempty("At least one goal is required");

const passwordSchema = z
  .string()
  .min(8, { message: "password must be 8 character long" })
  .max(20, { message: "password can't be long than 20 character" })
  .nonempty("At least one goal is required")
  .refine((password) => /[A-Z]/.test(password), {
    message: "password must contain uppercase",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "password must contain lowercase",
  })
  .refine((password) => /[0-9]/.test(password), { message: "password must contain digits" })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "password must contain special characters",
  });

const confirmPassSchema = z.string()

export const authSchema = z.object({
    name  : z.string().optional(),
    email : emailScehma,
    password : passwordSchema
})

export const forgotPassSchema = z.object({
  email : emailScehma
})

export const resetPassSchema = z.object({
  password : passwordSchema,
  confirmPassword : confirmPassSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "should be same as password",
  path: ['confirmPassword'],
});


export type forgotpassForm = z.infer<typeof forgotPassSchema>
export type authForm = z.infer<typeof authSchema>;
export type resetPassForm = z.infer<typeof resetPassSchema>

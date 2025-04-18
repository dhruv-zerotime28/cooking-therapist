import { z } from "zod";


export const emailScehma = z.string().email()

const passwordSchema = z
  .string()
  .min(8, { message: "password must be 8 character long" })
  .max(20, { message: "password can't be long than 20 character" })
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
export type authForm = z.infer<typeof authSchema>;


export const signInSchema = z.object({
  email : emailScehma,
  password:passwordSchema
})

export const forgotPassSchema = z.object({
  email : emailScehma
})
export type forgotpassForm = z.infer<typeof forgotPassSchema>


export const resetPassSchema = z.object({
  password : passwordSchema,
  confirmPassword : confirmPassSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "should be same as password",
  path: ['confirmPassword'],
});


export const resetPassApiSchema = signInSchema.extend({
  id :  z.string().uuid(),
  token : z.string(),
})
export type resetPassApiType = z.infer<typeof resetPassApiSchema>
export type resetPassForm = z.infer<typeof resetPassSchema>



export const changePasswordSchema = z.object({
  oldPassword : passwordSchema,
  newPassword : passwordSchema
})
export type changePasswordType = z.infer<typeof changePasswordSchema>


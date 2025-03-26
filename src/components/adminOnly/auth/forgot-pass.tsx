'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotpassForm,forgotPassSchema } from '@/Schemas/auth';

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid ,isSubmitSuccessful,isSubmitting},
  } = useForm<forgotpassForm>({
    resolver: zodResolver(forgotPassSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
    email: '',
    },
  });

  const formSubmit = (data: any) => {
    console.log(data);
    reset()
  };
  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-primary">Cooking Therapist</h1>
          <p className="text-balance text-muted-foreground">Forgot Password</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
          Submit
        </Button>
        <div>
          {
            isSubmitSuccessful && <p className="text-xs text-primary text-center">
            Password Reset Link has been sent to your email address
          </p>
          }
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="text-center text-sm">
            Go Back to{' '}
            <Link href="/admin/signIn" className="hover:text-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema, authForm } from '@/Schemas/auth';
import { Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '@/actions/admin/auth-actions';
import { toast } from 'sonner';



export function AuthForm({isSignIn}:{isSignIn :boolean}) {
  // const [isSignIn, SetisSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<authForm>({
    resolver: zodResolver(authSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onsubmit = async (data: authForm) => {
    console.log('submitted:',data)
    try {
      const response = await adminLogin(data);
      toast.success((response as string) || 'Logged is successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
    reset();
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(onsubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-primary">Cooking Therapist</h1>
          <p className="text-balance text-muted-foreground">
            Admin <span>{isSignIn ? 'Sign In' : 'Sign Up'}</span>
          </p>
        </div>
        {!isSignIn && (
          <div className="grid gap-2">
            <Label htmlFor="email">Admin Name</Label>
            <Input id="name" placeholder="Amy Bhavsar" {...register('name')} />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="cookingtherapy@gmail.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {isSignIn && <Link
              href="/admin/forgotPassword"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>

            }
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters',
                },
              })}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghostInput"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={!isValid} className="w-full">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
        {
          isSignIn && <div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account? <Link href="/admin/signUp">Sign up</Link>
        </div>
          </div>
        }
      </div>
    </form>
  );
}

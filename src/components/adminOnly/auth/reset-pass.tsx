'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { resetPassForm, resetPassSchema,resetPassApiType} from '@/Schemas/auth';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { resetPasswordApiCall } from '@/actions/admin/auth-actions';

interface showPassbtn {
  pass : boolean,
  confirmPass : boolean
}

export function ResetPassword() {
  const [showPassword, setShowPassword] = useState<showPassbtn>({pass : false,confirmPass:false});
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("token")|| '';
  const email = searchParams.get("email") || '';
  const id = searchParams.get("id")||'';
  console.log("token:",resetToken,"id:",email,"id:",id)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<resetPassForm>({
    resolver: zodResolver(resetPassSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const formSubmit = async(data: any) => {
    const reqData:resetPassApiType = {
      email,
      id,
      token : resetToken,
      password : data.password
    }
    try {
      const res = await resetPasswordApiCall(reqData);
      toast.success(res as string)
    } catch (error) {
      toast.error(error as string)
    }
    reset()
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-primary">Cooking Therapist</h1>
          <p className="text-balance text-muted-foreground">Reset Password</p>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">New Password</Label>
          </div>
          <div className="relative">
            <Input
              type={showPassword.pass ? 'text' : 'password'}
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
              onClick={()=>{setShowPassword((prev) => ({ ...prev, pass: !prev.pass }));}}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              {!showPassword.pass ? (
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <div className="relative">
            <Input
              type={showPassword.confirmPass ? 'text' : 'password'}
              placeholder="Confirm password"
              {...register('confirmPassword')}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghostInput"
              size="sm"
              onClick={() => setShowPassword((prev) => ({ ...prev, confirmPass : !prev.confirmPass}))}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              {!showPassword.confirmPass ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={!isValid} className="w-full">
          Reset Password
        </Button>

        <div>
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

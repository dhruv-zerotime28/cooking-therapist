import { AuthForm } from '@/components/adminOnly/auth/auth-form';

export default function signIn() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthForm />
      </div>
    </div>
  );
}

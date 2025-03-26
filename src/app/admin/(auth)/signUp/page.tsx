
import { AuthForm } from '@/components/adminOnly/auth/auth-form';
import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';

export default function signUp() {
// do check in this page that the admin in super admin and authenticated only then user can be created otherwiser redirected with message only real owner super admin can create new user
  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCommonCard children={<AuthForm isSignIn={false} />}/>      
      </div>
    </div>
  );
}
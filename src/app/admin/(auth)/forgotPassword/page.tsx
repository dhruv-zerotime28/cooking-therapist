
import { ForgotPassword } from '@/components/adminOnly/auth/forgot-pass';
import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
export default function forgotPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCommonCard children={ <ForgotPassword />}/>  
      </div>
    </div>
  );
}

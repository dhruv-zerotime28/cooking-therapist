
import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
import { ResetPassword } from '@/components/adminOnly/auth/reset-pass';

export default function signIn() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCommonCard children={<ResetPassword />}/>        
      </div>
    </div>
  );
}

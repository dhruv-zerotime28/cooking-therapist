'use client'

import { CommonAuthForm } from '@/components/adminOnly/auth/CommonAuthForm';
import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
import { resetPassForm, resetPassSchema,resetPassApiType} from '@/Schemas/auth';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { resetPasswordApiCall } from '@/actions/admin/auth-actions';
import { useRouter } from 'next/navigation';

const forgotPassFields = [
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter your password',
  },
]
export default function ResetPassword() {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("token")|| '';
    const email = searchParams.get("email") || '';
    const id = searchParams.get("id")||'';
    const router = useRouter();
  
    const ResetPassSubmit = async(data: resetPassForm) => {
      const reqData:resetPassApiType = {
        email,
        id,
        token : resetToken,
        password : data.password
      }
      try {
        const res = await resetPasswordApiCall(reqData);
        toast.success(res as string)
        router.push('/admin/signIn')
      } catch (error) {
        toast.error(error as string)
      }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCommonCard
          children={
            <CommonAuthForm
              title="Cooking Therapist"
              subtitle="Reset Password"
              fields={forgotPassFields}
              schema={resetPassSchema}
              onSubmit={ResetPassSubmit}
              submitText="Reset Password"
            />
          }
        />
      </div>
    </div>
  );
}


// import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
// import { ResetPassword } from '@/components/adminOnly/auth/reset-pass';

// export default function signIn() {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
//       <div className="w-full max-w-sm md:max-w-3xl">
//         <AuthCommonCard children={<ResetPassword />}/>        
//       </div>
//     </div>
//   );
// }

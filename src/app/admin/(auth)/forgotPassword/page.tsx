'use client'

import { CommonAuthForm } from '@/components/adminOnly/auth/CommonAuthForm';
import { ForgotPasswordApiCall} from '@/actions/admin/auth-actions';
import { forgotpassForm,forgotPassSchema } from '@/Schemas/auth';
import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';

import { toast } from 'sonner';

const forgotPassFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
]
export default function ForgotPassword() {

    const ForgotPassSubmit = async(data: forgotpassForm) => {
    try {
      const res = await ForgotPasswordApiCall(data);
      console.log('ressss:',res)
      toast.success(res as string)
    } catch (error) {
      console.log('ressserrrr:',error)
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
              subtitle="Forgot Password"
              fields={forgotPassFields}
              schema={forgotPassSchema}
              onSubmit={ForgotPassSubmit}
              submitText="Forgot Password"
            />
          }
        />
      </div>
    </div>
  );
}












// import { ForgotPassword } from '@/components/adminOnly/auth/forgot-pass';
// import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
// export default function forgotPassword() {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
//       <div className="w-full max-w-sm md:max-w-3xl">
//         <AuthCommonCard children={ <ForgotPassword />}/>  
//       </div>
//     </div>
//   );
// }

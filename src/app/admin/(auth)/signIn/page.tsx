'use client'

import { AuthCommonCard } from '@/components/adminOnly/auth/common-auth';
import { CommonAuthForm } from '@/components/adminOnly/auth/CommonAuthForm';
import { authSchema, authForm } from '@/Schemas/auth';
import { adminSignIn } from '@/actions/admin/auth-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';

const signInFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
];

export default function signIn() {
  const router = useRouter();
  const { addAdminDetails } = useStore();

  const signInSumbit = async (data: authForm) => {
    await adminSignIn(data)
      .then((res) => {
        toast.success(res.message);
        addAdminDetails(res.data);
        router.push('/admin/dashboard');
      })
      .catch((err) => {
        toast.error(err as string);
      });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCommonCard
          children={
            <CommonAuthForm
              title="Cooking Therapist"
              subtitle="Admin Sign In"
              fields={signInFields}
              schema={authSchema}
              onSubmit={signInSumbit}
              submitText="Sign In"
              forgotPasswordLink='/admin/forgotPassword'
            />
          }
        />
      </div>
    </div>
  );
}


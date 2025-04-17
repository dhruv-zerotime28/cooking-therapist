'use client';
import { CommonAuthForm } from './CommonAuthForm';
import { changePasswordApiCall } from '@/actions/admin/manage-admin-actions';
import { changePasswordSchema, changePasswordType } from '@/Schemas/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const changePasswordFields = [
  {
    name: 'oldPassword',
    label: 'Old password',
    type: 'password',
    placeholder: 'Enter your old password',
  },
  {
    name: 'newPassword',
    label: 'New password',
    type: 'password',
    placeholder: 'Enter your new password',
  },
];

const defaultValues = {
  oldPassword : '',
  newPassword : ''
}
export function ChangePasswordForm() {
  const router = useRouter();

  const onPasswordChangeSubmit = async (data: changePasswordType) => {
    try {
      const res = await changePasswordApiCall(data);
      toast.success(res?.message || 'password changed!');
      router.push('/admin/signIn');
    } catch (err) {
      toast.success((err as string) || 'Error while changing password');
    }
  };

  return (
    <div>
      <CommonAuthForm
        title="Cooking Therapist"
        subtitle="Change Password"
        fields={changePasswordFields}
        schema={changePasswordSchema}
        defaultValues={defaultValues}
        onSubmit={onPasswordChangeSubmit}
        submitText="Change Password"
      />
    </div>
  );
}



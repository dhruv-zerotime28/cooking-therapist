'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { logOutApiCall } from '@/actions/admin/auth-actions';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChangePasswordForm } from '../../auth/change-pass';
import { useRouter } from 'next/navigation'
import useStore from '@/store/store';

export function NavAdmin({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const router = useRouter();
  const admin = useStore((state) => state.admin);
  const {removeAdminDetails} = useStore();
  const LogOut = async () => {
    try {
      const res = await logOutApiCall();
      console.log('res:',res)
      toast.success(res as string)
      removeAdminDetails();
      router.push("/admin/signIn")
    } catch (error) {
      console.log('err:',error)
      toast.error(error as string)
    }
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mx-4">
          <DropdownMenuLabel>
            <p  className='text-sm'>{admin?.name}</p>
            <p className='text-xs'>{admin?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className='p-0'>Change/Reset Password</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuItem> 
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => LogOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog Content */}
      <DialogContent> 
        <DialogHeader>  
        </DialogHeader>
          {/* change pass form */}
        <ChangePasswordForm/> 
      </DialogContent>
    </Dialog>
  );
}

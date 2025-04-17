'use client';

import { adminTableType } from '@/Schemas/admin';
import { CommonAuthForm } from '../../auth/CommonAuthForm';
import { addEditAdminScehma,addEditAdminType} from '@/Schemas/admin';
import { toast } from 'sonner';
import { addNewAdmin } from '@/actions/admin/manage-admin-actions';


interface IAuthForm { 
  isEdit : boolean,
  adminInfo? : adminTableType
  dailogClose :()=> void
  refresh :()=> void
}

const AddEditAdminFields = [
  { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { name: "name", label: "Name", type: "text", placeholder: "Enter admin name" },
];

export function AddEditAdmin(props:IAuthForm){

  const onAddSubmit = async(data:addEditAdminType)=>{
    await addNewAdmin(data)
        .then((res) => {
          toast.success(res as string);
          props.refresh()
          props.dailogClose()
        })
        .catch((err) => {
          toast.error(err as string);
          props.dailogClose()
        });
  }
  
  const onEditSubmit = async ()=>{

  }
console.log('isedit',props.isEdit)
    if(props.isEdit){
      return <CommonAuthForm
      title="Cooking Therapist"
      subtitle="Edit Admin"
      fields={AddEditAdminFields}
      schema={addEditAdminScehma}
      onSubmit={onEditSubmit}
      submitText="Edit Admin Details"
      defaultValues={props.adminInfo}
      />
    }else{
        return <CommonAuthForm
        title="Cooking Therapist"
        subtitle="Add New Admin"
        fields={AddEditAdminFields}
        schema={addEditAdminScehma}
        onSubmit={onAddSubmit}
        submitText="Add Admin"
        />
    }
}
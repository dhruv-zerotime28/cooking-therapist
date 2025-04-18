'use client'

import { getRecipeById } from '@/actions/client/recipeLists';
import RecipeForm from '@/components/adminOnly/dashboard/recipe/recipe-form';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function update() {
  const [editData,setEditData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await getRecipeById(id as string);
        setEditData(res)
      } catch (error) {
       router.push('/admin')
      }
    }
    fetchData()
  },[])
 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Update Recipe</h1>
      {editData ? <RecipeForm initialData={editData}/> :"loading"}
     
    </div>
  );
}

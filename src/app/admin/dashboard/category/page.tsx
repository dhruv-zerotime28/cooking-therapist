"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { getAllCategories,updatedCategory,deleteCategory, addNewCategory } from '@/actions/admin/categories-actions';
import { adminCategoryType } from '@/Schemas/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<adminCategoryType[]>()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);


  useEffect(()=>{
    const getCategoryDetails = async ()=>{
      try {
        const category : adminCategoryType[] = await getAllCategories();
        setCategories(category)
      } catch (error) {
        toast.error('err while fetching category!')
      }
    }
    getCategoryDetails();
  },[])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if(editingCategory){
      try {
        const updateData = {
          id : editingCategory.id,
          name : formData.get('name') as string,
        }
        const UpdateCategory:any = await updatedCategory(updateData)
        toast.success(UpdateCategory.message)
        
        //set updated list
        const category : adminCategoryType[] = await getAllCategories();
        setCategories(category)
      } catch (error) {
         toast.error('show err here')
      }
    }else{
      try {
        const name = formData.get('name') as string;
        const addCategory:any = await addNewCategory(name)
        toast.success(addCategory.message)
        
        //set updated list
        const category : adminCategoryType[] = await getAllCategories();
        setCategories(category)
      } catch (error:any) {
        toast.error(error)
      }
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async(id:string) => {
    try {
      const res : any = await deleteCategory(id);
      toast.success(res.message)

      //set updated list
      const category : adminCategoryType[] = await getAllCategories();
      setCategories(category)
    } catch (error:any) {
      toast.error(error)
    }
  };

  return (
    <div className='w-full p-4 m-2'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Recipe Count</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories && categories?.length > 0 ? categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.count} recipes</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )):
            <TableRow>
                  <TableCell>No Categories as of now add some</TableCell>
             </TableRow>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
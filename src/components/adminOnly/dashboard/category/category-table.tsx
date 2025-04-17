'use client';

import { useState } from 'react';
import { useCategory } from './useCategory';
import { getCategoryColumns } from './category-columns';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { toast } from 'sonner';
import {
  deleteCategory,
  updatedCategory,
  addNewCategory,
} from '@/actions/admin/categories-actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { flexRender } from '@tanstack/react-table';
import { DataTablePagination } from '../tables-common/tables-pagination';

export default function CategoryTable() {
  const { data, loading, page, setPage, setSearch, refreshData } = useCategory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingcategory, seteditingcategory] = useState<any>(null);

  const handleEdit = (category: any) => {
    seteditingcategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success('categorydeleted successfully');
      refreshData(); // refetches the data after update
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const columns = getCategoryColumns(handleEdit, handleDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      if (editingcategory) {
        await updatedCategory({
          id: editingcategory.id,
          name: formData.get('name') as string,
        });
        toast.success('Category updated successfully');
        refreshData(); // refetches the data after update
      } else {
        await addNewCategory(formData.get('name') as string);
        toast.success('Category added successfully');
        refreshData();
      }
    } catch (error) {
      toast.error('Failed to process request');
    }

    setIsDialogOpen(false);
    seteditingcategory(null);
  };

  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingcategory ? 'Edit category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingcategory?.name}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingcategory ? 'Update Tag' : 'Add Tag'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <div className="m-2">
          <Input
            type="text"
            placeholder="Search Category"
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 border rounded md:w-96"
          />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {' '}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                  <img src="/loader.gif" alt="...loading" className='w-full'/>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className='flex justify-center p-2 mt-4'>
          <DataTablePagination table={table} />
          </div>
        </div>
      </Card>
    </div>
  );
}

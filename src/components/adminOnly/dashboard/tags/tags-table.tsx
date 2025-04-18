'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import {
  updateTag,
  addNewTag,
  deleteTag,
} from '@/actions/admin/tags-actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTags } from './useTags';
import { getTagsColumns } from './tag-columns';
import { DataTablePagination } from '../tables-common/tables-pagination';

export default function TagsTable() {
  const { data, loading, page, setPage, setSearch, refreshData } = useTags();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteTag(id);
      toast.success(res.message);
      refreshData();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const columns = getTagsColumns(handleEdit, handleDelete); 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (editingTag) {
      try {
        const updateData = {
          id: editingTag.id,
          name: formData.get('name') as string,
        };
        const Updatetags: any = await updateTag(updateData);
        toast.success(Updatetags.message);
      } catch (error) {
        toast.error('show err here');
      }
    } else {
      try {
        const name = formData.get('name') as string;
        const addTags: any = await addNewTag(name);
        toast.success(addTags.message);
      } catch (error: any) {
        toast.error(error);
      }
    }
    refreshData()
    setIsDialogOpen(false);
    setEditingTag(null);
  };
  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-3xl font-bold">Tags</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTag ? 'Edit Tag' : 'Add New Tag'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingTag?.name}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingTag ? 'Update Tag' : 'Add Tag'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <div className="m-2 ">
          <Input
            type="text"
            placeholder="search tag"
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 border rounded md:w-96"
          />
          <Table>
            <TableHeader className="h-12">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
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
                  <img src="/loader.gif" alt="...loading" className='w-96 text-center bg-yellow-50'/>
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

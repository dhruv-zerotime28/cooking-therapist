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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAdminManage } from './useAdminMange';
import { getAdminManageColumns } from './admin-manage-columns';
import { DataTablePagination } from '../tables-common/tables-pagination';
import { AddEditAdmin } from './add-edit-admin';

export default function AdminManagementTable() {
  const { data, loading, page, setPage, setSearch,refreshData } = useAdminManage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<any>(null);

  const handleEdit = (admin: any) => {
    console.log('will edit on requirement confirmation!');
    // setIsEdit(admin);
    // setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    console.log('dlt');
    // try {
    //   const res: any = await deleteTag(id);
    //   toast.success(res.message);

    //   //set updated list
    //   const tagsupdated: adminTableType[] = await getFilteredTags({
    //     search,
    //     page,
    //     sortField,
    //   });
    //   setData(tagsupdated);
    // } catch (error: any) {
    //   toast.error(error);
    // }
  };

  const columns = getAdminManageColumns(handleEdit, handleDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {/* <DialogTitle className="text-2xl font-bold text-primary text-center">
                Cooking Therapist
              </DialogTitle> */}
            </DialogHeader>
              <AddEditAdmin
              isEdit={isEdit}
              dailogClose={() => setIsDialogOpen(false)}
              refresh={refreshData}
            />
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
                  <TableCell colSpan={4}>Loading...</TableCell>
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
          <div className="flex justify-center p-2 mt-4">
            <DataTablePagination table={table} />
          </div>
        </div>
      </Card>
    </div>
  );
}

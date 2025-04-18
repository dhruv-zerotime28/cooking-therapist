'use client'

import { useState } from 'react';
import { useRecipe } from './useRecipes';
import { getRecipeColumns } from './recipe-columns';
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
import { deleteReciepe } from '@/actions/admin/recipes-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { flexRender } from '@tanstack/react-table';
import { DataTablePagination } from '../../tables-common/tables-pagination';
import { useRouter } from 'next/navigation';

export default function RecipeTable() {
  const router = useRouter();
  const { data, loading, page, setPage, setSearch, refreshData } = useRecipe();

  const handleEdit = (id : string) => {
    router.push(`/admin/dashboard/recipelists/update?id=${id}`)
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReciepe(id);
      toast.success('recipe deleted successfully');
      refreshData(); // refetches the data after update
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const columns = getRecipeColumns(handleEdit, handleDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Button onClick={() => (router.push('recipelists/add'))}>
          <Plus className="mr-2 h-4 w-4" />
          Add Recipe
        </Button>
      </div>
      <Card>
        <div className="m-2">
          <Input
            type="text"
            placeholder="Search Recipe"
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
          <div className="flex justify-center p-2 mt-4">
            <DataTablePagination table={table} />
          </div>
        </div>
      </Card>
    </div>
  );
}

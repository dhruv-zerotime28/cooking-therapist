'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { recipeTableType } from '@/Schemas/recipes';

export const getRecipeColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<recipeTableType>[] => [
  {
    accessorKey: 'createdAt',
    header: 'Created On',
    id: 'createdAt',
    cell: ({ row }) => {
      const dateTime = new Date(row.getValue('createdAt'));
      return dateTime.toISOString().split('T')[0];
    },
  },
  {
    accessorKey: 'name',
    header: 'Recipe Name',
  },
  {
    accessorKey: 'cuisine',
    header: 'Cuisine',
  },
  {
    accessorKey: 'time',
    header: 'Time',
    id: 'time',
    cell: ({ row }) => {
      const rowData = row.original;
      return `${rowData.prepTime + rowData.cookTime} mins`;
    },
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const recipe = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleEdit(recipe.id)}
              className="flex justify-between"
            >
              Edit
              <Pencil className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(recipe.id)}
              className="flex justify-between"
            >
              Delete
              <Trash className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

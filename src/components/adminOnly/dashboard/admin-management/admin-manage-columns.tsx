'use client'

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminTableType } from '@/Schemas/admin';


export const getAdminManageColumns = (
  handleEdit: (admin: adminTableType) => void,
  handleDelete: (id: string) => void
): ColumnDef<adminTableType>[] => [
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
      header: 'Admin Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
        accessorKey: 'createdBy',
        header: 'Created By',
    },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const admin = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(admin)} className='flex justify-between'>
                Edit
                <Pencil className="h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(admin.id)} className='flex justify-between'>
                Delete
                <Trash className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

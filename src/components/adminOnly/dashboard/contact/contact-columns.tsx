'use client'

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash, Reply, Mail} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { IContactTableData } from '@/Schemas/contactUs';

export const getContactUsColumns = (
  replyUser: (category: IContactTableData) => void,
  handleDelete: (id: string) => void
): ColumnDef<IContactTableData>[] => [
    {
        accessorKey: 'status',
        header: 'Status',
        id: 'status',
        cell: ({ row }) => {
          const status:string = row.getValue('status');
         
          return <Badge variant={status === 'UNREAD' ? 'default' : 'secondary'}>
          {status === 'UNREAD' ? (
            <Mail className="h-3 w-3 mr-1" />
          ) : null}
          {status}
        </Badge>
        },
      },
  {
    accessorKey: 'name',
    header: 'Person Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'message',
    header: 'Message',
    id:'message',
    cell:({row})=>{
       return <div className="truncate max-w-[200px]" title={row.original.message}>
        {row.original.message}
      </div> 
    }   
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    id: 'createdAt',
    cell: ({ row }) => {
      const dateTime = new Date(row.getValue('createdAt'));
      return dateTime.toISOString().split('T')[0];
    },
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const msg = row.original;

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
              onClick={() => replyUser(msg)}
              className="flex justify-between"
            >
              Reply
              <Reply className="h-4 w-4" />             
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(msg.id)}
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

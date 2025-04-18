'use client';

import { useState } from 'react';
import { useContact } from './useContact';
import { getContactUsColumns } from './contact-columns';
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
import { Textarea } from '@/components/ui/textarea';
import { deleteMessageApi, replyUserApi } from '@/actions/admin/contact';

export default function ContactTable() {
  const { data, loading, page, setPage, setSearch, refreshData } = useContact();
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [editingcategory, seteditingcategory] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyMsg, setReplyMsg] = useState('');
  const replyUser = (message: any) => {
    setSelectedMessage(message);
    setIsReplyDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteMessageApi(id);
      toast.success(res ||'deleted message')
      refreshData(); 
    } catch (error) {
      toast.error('Failed to delete Message');
    }
  };

  const columns = getContactUsColumns(replyUser, handleDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(replyMsg, selectedMessage);
    try {
      const res = await replyUserApi({
        id : selectedMessage.id,
        name :selectedMessage.name,
        email: selectedMessage.email,
        message : selectedMessage.message,
        reply: replyMsg
      })
    } catch (error) {
      console.log(error)
      toast.error('error while sending')
    }
    refreshData();  
    setReplyMsg('');
    setIsReplyDialogOpen(false);
    seteditingcategory(null);
  };

  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>
      <Card>
        <div className="m-2">
          <Input
            type="text"
            placeholder="Name/Email"
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
                    <p className="text-center">Loading...</p>
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
      <div>
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="max-w-md">
            {' '}
            {/* Limit dialog width */}
            <DialogHeader>
              <DialogTitle>Reply to Message</DialogTitle>
            </DialogHeader>
            <div >
              <form onSubmit={handleReply} className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>From:</strong> {selectedMessage?.name}
                  </div>
                  <div className="text-sm">
                    <strong>Email:</strong> {selectedMessage?.email}
                  </div>
                  <div className="text-sm ">
                    <strong>Original Message:</strong>
                    <p className="mt-1 text-muted-foreground break-words">
                      {selectedMessage?.message}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="reply">Your Reply</Label>
                  <Textarea
                    id="reply"
                    name="reply"
                    rows={5}
                    required
                    placeholder="Type your reply here..."
                    value={replyMsg}
                    onChange={(e) => setReplyMsg(e.target.value)}
                    className="w-full" // Make Textarea take full width of its parent
                  />
                  <Button type="submit" className="w-full">
                    Send Reply
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

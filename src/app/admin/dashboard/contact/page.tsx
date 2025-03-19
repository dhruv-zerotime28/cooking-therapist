"use client";

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Reply, Trash, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const initialMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I loved the pizza recipe! Can you share more Italian recipes?',
    date: '2024-03-20',
    status: 'unread',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Having trouble with the bread recipe. Can you help?',
    date: '2024-03-19',
    status: 'read',
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const reply = formData.get('reply') as string;

    // In a real application, you would send the reply via email
    console.log(`Replying to ${selectedMessage.email}: ${reply}`);
    toast.success('Reply sent successfully');
    
    // Mark message as read
    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id ? { ...msg, status: 'read' } : msg
    ));
    
    setIsReplyDialogOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(message => message.id !== id));
      toast.success('Message deleted successfully');
    }
  };

  return (
    <div className='w-full p-4 m-2'>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Manage contact form submissions
          </p>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow></TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <Badge variant={message.status === 'unread' ? 'default' : 'secondary'}>
                    {message.status === 'unread' ? (
                      <Mail className="h-3 w-3 mr-1" />
                    ) : null}
                    {message.status}
                  </Badge>
                </TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell className="max-w-md truncate">
                  {message.message}
                </TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedMessage(message);
                        setIsReplyDialogOpen(true);
                      }}
                    >
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReply} className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm">
                <strong>From:</strong> {selectedMessage?.name}
              </div>
              <div className="text-sm">
                <strong>Email:</strong> {selectedMessage?.email}
              </div>
              <div className="text-sm">
                <strong>Original Message:</strong>
                <p className="mt-1 text-muted-foreground">
                  {selectedMessage?.message}
                </p>
              </div>
            </div>
            <div>
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                name="reply"
                rows={5}
                required
                placeholder="Type your reply here..."
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reply
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
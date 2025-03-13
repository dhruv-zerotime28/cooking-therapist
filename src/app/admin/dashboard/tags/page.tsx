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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

const initialTags = [
  { id: 1, name: 'Italian', count: 12 },
  { id: 2, name: 'Healthy', count: 8 },
  { id: 3, name: 'Quick', count: 15 },
  { id: 4, name: 'Dessert', count: 10 },
];

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tagData = {
      id: editingTag?.id || Date.now(),
      name: formData.get('name') as string,
      count: editingTag?.count || 0,
    };

    if (editingTag) {
      setTags(tags.map(tag => 
        tag.id === editingTag.id ? tagData : tag
      ));
      toast.success('Tag updated successfully');
    } else {
      setTags([...tags, tagData]);
      toast.success('Tag added successfully');
    }

    setIsDialogOpen(false);
    setEditingTag(null);
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(tag => tag.id !== id));
      toast.success('Tag deleted successfully');
    }
  };

  return (
    <div className='w-full p-4 m-2'>
      <div className="flex justify-between items-center mb-6">
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
              <DialogTitle>{editingTag ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Recipe Count</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.count} recipes</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(tag)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tag.id)}
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
    </div>
  );
}
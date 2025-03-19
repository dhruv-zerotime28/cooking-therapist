'use client';

import { useEffect, useState } from 'react';
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
import { adminTagsType } from '@/Schemas/tags';
import {
  getAllTags,
  updateTag,
  deleteTag,
  addNewTag,
} from '@/actions/admin/tags-actions';

export default function TagsPage() {
  const [tags, setTags] = useState<adminTagsType[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);

  useEffect(() => {
    const getTagDetails = async () => {
      try {
        const tagsdetails: adminTagsType[] = await getAllTags();
        setTags(tagsdetails);
      } catch (error) {
        toast.error('err while fetching category!');
      }
    };
    getTagDetails();
  }, []);

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

        //set updated list
        const tagsupdated: adminTagsType[] = await getAllTags();
        setTags(tagsupdated);
      } catch (error) {
        toast.error('show err here');
      }
    } else {
      try {
        const name = formData.get('name') as string;
        const addTags: any = await addNewTag(name);
        toast.success(addTags.message);

        //set updated list
        const tagsupdated: adminTagsType[] = await getAllTags();
        setTags(tagsupdated);
      } catch (error: any) {
        toast.error(error);
      }
    }

    setIsDialogOpen(false);
    setEditingTag(null);
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteTag(id);
      toast.success(res.message);

      //set updated list
      const tagsupdated: adminTagsType[] = await getAllTags();
      setTags(tagsupdated);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full p-4 m-2">
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Recipe Count</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags && tags?.length > 0 ?
              tags.map((tag) => (
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
              )):
              <TableRow>
                  <TableCell>No tags as of now add some</TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
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

import { Plus, Pencil, Trash, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { recipeListSchema } from '@/Schemas/recipes';
import { deleteReciepe, getAllRecipes } from '@/actions/admin/recipes-actions';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<recipeListSchema[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string }[]
  >([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const reciepeList: recipeListSchema[] = await getAllRecipes();
        setRecipes(reciepeList);
      } catch (error) {
        toast.error('err while fetching category!');
      }
    };
    getCategoryDetails();
  }, []);

  const handleEdit = (recipe: any) => {
    //direct the user to update page with pre filled recipe data
  };

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteReciepe(id);
      toast.success(res.message);

      //set updated list
      const reciepeList: recipeListSchema[] = await getAllRecipes();
      setRecipes(reciepeList);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Button onClick={() => router.push('recipeLists/add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Recipe
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              {/* <TableHead>Category</TableHead> */}
              <TableHead>Cuisine</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes ? (
              recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.name}</TableCell>
                  {/* <TableCell>{recipe.category}</TableCell> */}
                  <TableCell>{recipe.cuisine}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {recipe.prepTime} + {recipe.cookTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{recipe.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(recipe)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Recipes are there</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

{
  /* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingRecipe?.title}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingRecipe?.description}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingRecipe?.category}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cuisine">Cuisine</Label>
                  <Input
                    id="cuisine"
                    name="cuisine"
                    defaultValue={editingRecipe?.cuisine}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="prepTime">Prep Time</Label>
                  <Input
                    id="prepTime"
                    name="prepTime"
                    defaultValue={editingRecipe?.prepTime}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input
                    id="cookTime"
                    name="cookTime"
                    defaultValue={editingRecipe?.cookTime}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    defaultValue={editingRecipe?.servings}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    defaultValue={editingRecipe?.rating}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Ingredients</Label>
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addIngredient}
                    className="mt-2"
                  >
                    Add Ingredient
                  </Button>
                </div>

                <div className="col-span-2">
                  <Label>Instructions</Label>
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        placeholder={`Step ${index + 1}`}
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addInstruction}
                    className="mt-2"
                  >
                    Add Instruction
                  </Button>
                </div>

                <div className="col-span-2">
                  <Label>Notes</Label>
                  {notes.map((note, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add note"
                        value={note}
                        onChange={(e) => updateNote(index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNote(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addNote}
                    className="mt-2"
                  >
                    Add Note
                  </Button>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={editingRecipe?.tags?.join(', ')}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
              </Button>
            </form>
          </DialogContent>
        </Dialog> */
}

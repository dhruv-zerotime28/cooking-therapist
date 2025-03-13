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
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for recipes
const initialRecipes = [
  {
    id: 1,
    title: 'Classic Homemade Pizza',
    description: 'A delicious pizza with a crispy crust and fresh toppings.',
    category: 'Dinner',
    cuisine: 'Italian',
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: 4,
    rating: 4.5,
    ingredients: [
      { name: 'Pizza Dough', quantity: '1 pound' },
      { name: 'Tomato Sauce', quantity: '1 cup' },
      { name: 'Mozzarella Cheese', quantity: '2 cups' },
    ],
    instructions: [
      'Preheat oven to 450°F',
      'Roll out the pizza dough',
      'Spread sauce and add toppings',
      'Bake for 12-15 minutes',
    ],
    notes: [
      'Use room temperature dough for best results',
      'Preheat pizza stone if available',
    ],
    tags: ['Italian', 'Comfort Food'],
  },
  {
    id: 2,
    title: 'Avocado Toast',
    description: 'Healthy and delicious breakfast topped with fresh avocado.',
    category: 'Breakfast',
    cuisine: 'Modern',
    prepTime: '5 mins',
    cookTime: '5 mins',
    servings: 2,
    rating: 4.8,
    ingredients: [
      { name: 'Bread', quantity: '2 slices' },
      { name: 'Avocado', quantity: '1 large' },
      { name: 'Salt', quantity: 'to taste' },
    ],
    instructions: [
      'Toast bread until golden',
      'Mash avocado and season',
      'Spread on toast',
    ],
    notes: [
      'Use ripe avocados',
      'Add red pepper flakes for extra kick',
    ],
    tags: ['Healthy', 'Quick'],
  },
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const recipeData = {
      id: editingRecipe?.id || Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      cuisine: formData.get('cuisine') as string,
      prepTime: formData.get('prepTime') as string,
      cookTime: formData.get('cookTime') as string,
      servings: parseInt(formData.get('servings') as string),
      rating: parseFloat(formData.get('rating') as string) || 0,
      ingredients,
      instructions,
      notes,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
    };

    if (editingRecipe) {
      setRecipes(recipes.map(recipe => 
        recipe.id === editingRecipe.id ? recipeData : recipe
      ));
      toast.success('Recipe updated successfully');
    } else {
      setRecipes([...recipes, recipeData]);
      toast.success('Recipe added successfully');
    }

    setIsDialogOpen(false);
    setEditingRecipe(null);
    setIngredients([]);
    setInstructions([]);
    setNotes([]);
  };

  const handleEdit = (recipe: any) => {
    setEditingRecipe(recipe);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setNotes(recipe.notes);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      toast.success('Recipe deleted successfully');
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const updateIngredient = (index: number, field: 'name' | 'quantity', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const addNote = () => {
    setNotes([...notes, '']);
  };

  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full p-4 m-2'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>{recipe.category}</TableCell>
                <TableCell>{recipe.cuisine}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime} + {recipe.cookTime}</span>
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
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
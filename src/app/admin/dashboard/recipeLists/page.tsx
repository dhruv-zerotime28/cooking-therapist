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
import UpdateRecipe from '@/components/adminOnly/recipe/update-recipe';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<recipeListSchema[]>();
  const [loadForm,setLoadForm] = useState<boolean>(false);

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
    setLoadForm(true)
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
  
 if(loadForm){
  return (
    <div>
    <UpdateRecipe/>
  </div>
  )
 }else{
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
            {recipes && recipes?.length > 0 ? (
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
  
}



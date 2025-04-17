'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getRecipeById } from '@/actions/client/recipeLists';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ImagesAndInfoWindow,
  ImagesAndInforMobile,
} from '@/components/usersOnly/reciepesById/responsiveDesign';
import { recipeSchemaType } from '@/Schemas/recipes';
import { toast } from 'sonner';
import { RelatedRecipes } from '@/components/usersOnly/reciepesById/related-recipes';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState<recipeSchemaType>();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await getRecipeById(id as string);
        // console.log('res',res);
        setRecipeData(res);
      } catch (error) {
        // console.log('err in getting by id')
        toast.error('something went wrong!');
      }
    };
    getRecipe();
  }, []);

  if (!recipeData) return <>Loading</>;
  return (
    <div className="container mx-auto mt-8 px-4 lg:px-0">
      {/* Recipe Title and Meta */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-primary lg:text-4xl">
          {recipeData && recipeData.name}
        </h1>
        <div className="mt-2 flex flex-wrap justify-between text-sm">
          <div className="flex flex-wrap items-center">
            <span>April 17, 2018</span>
            <span className="mx-2">•</span>
            <span>Author: Cooking Therapist</span>
            <span className="mx-2">•</span>
            <span>Cuisine: {recipeData.cuisine}</span>
          </div>
          <div className="flex items-center">
            Rating:
            <span className="text-green-500">
              {[...Array(recipeData.rating)].map(()=> <Star className="inline-block" size={16} />)}
              {/* <Star className="inline-block" size={16} />
              <Star className="inline-block" size={16} />
              <Star className="inline-block" size={16} /> */}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="lg:flex">
        {/* Left Side: Recipe Details */}
        <div className="lg:w-2/3 lg:pr-8">
          {/* Time Information */}
          <div className="mb-4 flex justify-between rounded bg-card p-4 text-secondary">
            <div>
              Prep Time:{' '}
              <span className="font-semibold">{recipeData.prepTime}</span>
            </div>
            <div>
              Cook Time:{' '}
              <span className="font-semibold">{recipeData.cookTime}</span>
            </div>
            <div>
              Total Time:{' '}
              <span className="font-semibold">
                {recipeData.cookTime + recipeData.prepTime}
              </span>
            </div>
          </div>

          {/* Mobile: Image and Tags/Categories */}
          <ImagesAndInforMobile
            images={recipeData.images}
            tags={recipeData.recipeTag}
            categories={recipeData.recipeCategory}
          />

          {/* Description */}
          <div className="mb-6 rounded bg-secondary p-4 text-justify whitespace-pre-line">
            {recipeData.description}
          </div>

          {/* Ingredient List */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">
              Ingredients
            </h2>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Ingredient</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipeData.ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {ingredient.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {ingredient.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Instructions */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">
              Instructions
            </h2>
            <ol className="list-decimal pl-6">
              {recipeData.instruction.map((instruction, index) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </section>

          {/* Notes */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">Notes</h2>
            <ul className="list-disc pl-6">
              {recipeData.notes.map((note, index) => (
                <li key={index} className="mb-2">
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Side: Image Gallery and Meta Information */}
        <ImagesAndInfoWindow
          images={recipeData.images}
          tags={recipeData.recipeTag}
          categories={recipeData.recipeCategory}
        />
      </div>

      {/* Related Dishes */}
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold text-primary">
          Related Dishes
        </h2>
        <ul className="list-none pl-0">
          {recipeData && (
            <RelatedRecipes
              tagIds={recipeData.recipeTag}
              recipeId={recipeData.id}
            />
          )}
        </ul>
      </section>
    </div>
  );
};

export default Recipe;

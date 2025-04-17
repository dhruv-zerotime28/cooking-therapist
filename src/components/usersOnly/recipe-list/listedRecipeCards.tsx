import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { recipeSchemaType } from '@/Schemas/recipes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface IRecieps {
  recipes: recipeSchemaType[];
}

export const ListedRecipeCards = ({ recipes }: IRecieps) => {
  const router = useRouter();
  if (recipes) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mx-60 px-2">
        {recipes.map((recipe: any, index: number) => {
          return (
            <Card
              key={recipe.id}
              className="group overflow-hidden py-0"
              onClick={() => {
                router.push(`recipes/${recipe.id}`);
              }}
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.images[0]}
                    alt={recipe.name}
                    fill
                    className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2 text-xl line-clamp-1">
                  {recipe.name}
                </CardTitle>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.recipeTag.map((tag: any) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      // onClick={() => setSelectedTag(tag)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <span className="text-sm text-muted-foreground">
                  ⏱ {`${recipe.cookTime + recipe.prepTime} mins`}
                </span>
                <span className="text-sm text-muted-foreground">
                  {recipe.cuisine}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  } else {
    return;
  }
};

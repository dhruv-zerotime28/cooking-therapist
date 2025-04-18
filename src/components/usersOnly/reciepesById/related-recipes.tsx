'use client';
import { categoryType } from '@/Schemas/categories';
import { tagType } from '@/Schemas/tags';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getRelatedRecipes } from '@/actions/client/recipeLists';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface IRelatedrelatedRecipessProps {
  recipeId: string;
  tagIds: tagType[];
}
interface IrelatedRecipe {
  id: string;
  name: string;
  images: string[];
  prepTime: string;
  cookTime: string;
  description: string;
  cuisine: string;
}
export function RelatedRecipes({
  tagIds,
  recipeId,
}: IRelatedrelatedRecipessProps) {
  const [relatedRecipes, setrelatedRecipes] = useState<IrelatedRecipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      const tags = tagIds.map((t) => t.id);
      try {
        const res = await getRelatedRecipes(recipeId, tags);
        console.log('realted recipe:', res);
        setrelatedRecipes(res);
      } catch (error) {}
    };
    fetchRelatedRecipes();
  }, []);
  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {relatedRecipes.length > 0 ? (
            relatedRecipes.map((recipe: IrelatedRecipe) => {
              return (
                <CarouselItem
                  key={recipe.id}
                  className="basis-1/3"
                >
                  <Card
                    key={recipe.id}
                    className="group overflow-hidden py-0 min-h-[400px]"
                    onClick={() => {
                      router.push(`/recipes/${recipe.id}`);
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
                </CarouselItem>
              );
            })
          ) : (
            <div>   No related dishes</div>
          )}
            {/* <CarouselPrevious />
             <CarouselNext /> */}
        </CarouselContent>
      </Carousel>
    </div>
  );
}



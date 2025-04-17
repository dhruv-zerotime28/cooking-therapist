'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { recipeForm } from '@/Schemas/recipes';
import { useRouter } from 'next/navigation';
import BasicInfoSection from './BasicInfoSection';
import MediaUploader from './ImageUploader';
import { Card } from '@/components/ui/card';
import { tagType } from '@/Schemas/tags';
import { categoryType } from '@/Schemas/categories';
import DetailsSection from './Details';
import IngredientsSection from './IngredientSection';
import { getAllCategory, getAllTags } from '@/actions/admin/recipes-actions';
import { RecipeFormDataType } from '@/Schemas/recipes';
import { toast } from 'sonner';
import { addRecipeFormSubmit, editRecipeFormSubmit } from './submitActions';

export default function RecipeForm({ initialData }: { initialData?: any }) {
  const [categoryOptions, setCategoryOption] = useState<categoryType[]>();
  const [tagOptions, setTagOptions] = useState<tagType[]>();
  const router = useRouter();
  const form = useForm<RecipeFormDataType>({
    resolver: zodResolver(recipeForm),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: initialData
      ? {
          ...initialData,
          recipeImages: initialData.images,
        }
      : {
          instruction: [],
          notes: [],
          ingredients: [],
        },
  });

  useEffect(() => {
    const FetchTagsAndCategory = async () => {
      const [tags, category] = await Promise.all([
        getAllTags(),
        getAllCategory(),
      ]);
      setTagOptions(tags);
      setCategoryOption(category);
    };
    FetchTagsAndCategory();
  }, []);

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: RecipeFormDataType) => {
    if (initialData) {
      try {
        const res = await editRecipeFormSubmit(data, initialData);
        toast.success((res as string) || 'recipe edited!');
      } catch (error) {
        toast.error('error while editing recipe info!');
      }
    } else {
      try {
        const res = await addRecipeFormSubmit(data);
        toast.success((res as string) || 'recipe added!');
      } catch (error) {
        toast.error('error while adding New recipe!');
      }
    }
    router.push('/admin/dashboard/recipelists');
    reset();
  };

  return (
    <Card className=" flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <Tabs defaultValue="Basic" className="flex-1">
          <TabsList className="sticky top-0 z-10 grid grid-cols-4 bg-background w-full">
            <TabsTrigger value="Basic">Basic Info</TabsTrigger>
            <TabsTrigger value="Details">Details</TabsTrigger>
            <TabsTrigger value="Ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="Media">Media</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1 h-[calc(100vh-20rem)] px-6 py-4 mt-5">
            <TabsContent value="Basic" className="space-y-6 ">
              <BasicInfoSection
                {...{ control, register, errors, categoryOptions }}
              />
            </TabsContent>
            <TabsContent value="Details">
              <DetailsSection {...{ control, register, errors, tagOptions }} />
            </TabsContent>
            <TabsContent value="Ingredients">
              <IngredientsSection {...{ watch, setValue, errors }} />
            </TabsContent>
            <TabsContent value="Media">
              <MediaUploader
                name="recipeImages"
                control={control}
                errors={errors}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        <div className="sticky bottom-0 flex justify-end gap-4 p-6 bg-background border-t mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/dashboard/recipelists  ')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            {initialData ? 'Update Recipe' : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { reactSelectStyles } from '@/components/ui/react-select';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import {
  getAllCategoryList,
  getAllRecipesList,
  getAllTagsList,
} from '@/actions/client/recipeLists';
import { useForm } from 'react-hook-form';
import { tagType } from '@/Schemas/tags';
import { categoryType } from '@/Schemas/categories';
import { recipeSchemaType } from '@/Schemas/recipes';
import { RecipePagination } from './pagination';
import { ListedRecipeCards } from './listedRecipeCards';

interface IRecipe {
  recipeData: recipeSchemaType[] | [];
  totalCount: number;
}
export default function AllRecipesPage() {
  const [categoryOptions, setCategoryOptions] = useState<categoryType[]>();
  const [tagOptions, setTagOptions] = useState<tagType[]>();
  const [recipes, setRecipes] = useState<IRecipe>({
    recipeData:[],
    totalCount:0
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { control, watch, register } = useForm<any>({
    defaultValues: {
      recipeTag: [],
      recipeCategory: [],
      search: '',
    },
  });

  const selectedTags = watch('recipeTag');
  const selectedCategories = watch('recipeCategory');
  const searchQuery = watch('search');

  useEffect(() => {
    const FetchInitialData = async () => {
      setLoading(true);

      const [recipes, category, tags] = await Promise.all([
        getAllRecipesList(),
        getAllCategoryList(),
        getAllTagsList(),
      ]);

      setRecipes(recipes);
      setCategoryOptions(category as categoryType[]);
      setTagOptions(tags as tagType[]);
      setLoading(false);
    };
    FetchInitialData();
  }, []);

  useEffect(() => {
    const updateRecipeData = async () => {
      try {
        const res = await getAllRecipesList({
          search: searchQuery,
          tags: selectedTags.map((t: any) => t.id),
          categories: selectedCategories.map((c: any) => c.id),
          page: pageNumber,
        });
        setPageNum(1  )
        setRecipes(res);
        setLoading(false);
      } catch (error) {
        console.log('err in getting recipes :', error);
      }
    };
    updateRecipeData();
  }, [searchQuery, selectedCategories, selectedTags, pageNumber]);

  const setPageNum = (num: number) => {
    setPageNumber(num);
    return;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
          alt="Recipes background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Our Recipes</h1>
          <p className="max-w-2xl text-lg">
            Explore our collection of delicious recipes for every occasion
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 z-10 border-b bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:mx-60 my-4 px-2">
        <div className="">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                // value={searchQuery},
                {...register('search')}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 min-w-96 px-2">
              <div className="min-w-1/2">
                <Label>Tags</Label>
                <Controller
                  name="recipeTag"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      instanceId="tag-select"
                      isMulti
                      options={tagOptions}
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.id}
                      className="react-select"
                      classNamePrefix="react-select"
                      placeholder="Select tags"
                      styles={reactSelectStyles}
                    />
                  )}
                />
              </div>
              <div className="min-w-1/2">
                <Label>Category</Label>
                <Controller
                  name="recipeCategory"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      instanceId="tag-select"
                      isMulti
                      options={categoryOptions}
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.id}
                      className="react-select"
                      classNamePrefix="react-select"
                      placeholder="Select Category"
                      styles={reactSelectStyles}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16">
        <div className="">
          {!loading && recipes ? (
            <ListedRecipeCards recipes={recipes?.recipeData} />
          ) : (
            <div className='w-full text-center font-semibold p-5'>No Recipes as of Now</div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section >
        <RecipePagination
          totalCount={recipes?.totalCount}
          setPageNum={setPageNum}
          currentPage = {pageNumber}
        />
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash, Upload, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { addRecipe, updateRecipe } from '@/actions/admin/recipes-actions';
import { recipeForm } from '@/Schemas/recipes';
import { tagType } from '@/Schemas/tags';
import { categoryType } from '@/Schemas/categories';

type RecipeFormData = z.infer<typeof recipeForm>;

const recipeOptions = [
  { value: '1', label: 'Classic Homemade Pizza' },
  { value: '2', label: 'Avocado Toast' },
  { value: '3', label: 'Chocolate Chip Cookies' },
];

interface RecipeFormProps {
  initialData?: any;
  tagOptions: tagType[];
  categoryOptions: categoryType[];
}

export default function RecipeForm({
  initialData,
  tagOptions,
  categoryOptions,
}: RecipeFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeForm),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: initialData
      ? {
          ...initialData,
          category: categoryOptions.filter((cat) =>
            initialData.category.includes(cat.name)
          ),
          tags: tagOptions.filter((tag) => initialData.tags.includes(tag.name)),
          relatedRecipes: recipeOptions.filter((recipe) =>
            initialData.relatedRecipes.includes(recipe.value)
          ),
          ingredients: initialData.ingredients || [],
          instruction: initialData.instruction || [],
          notes: initialData.notes || [],
        }
      : {
          ingredients: [],
          instruction: [],
          notes: [],
          category: [],
          tags: [],
          relatedRecipes: [],
        },
  });

  console.log('form err:', errors);
  // console.log("inside form ",tagOptions,categoryOptions)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    onDrop: (acceptedFiles) => {
      setImages([...images, ...acceptedFiles]);
      const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newUrls]);
    },
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newUrls = [...imageUrls];
    newImages.splice(index, 1);
    newUrls.splice(index, 1);
    setImages(newImages);
    setImageUrls(newUrls);
  };

  const ingredients = watch('ingredients');
  const instruction = watch('instruction');
  const notes = watch('notes');

  const addIngredient = () => {
    setValue('ingredients', [...ingredients, { name: '', quantity: '' }]);
  };

  const updateIngredient = (
    index: number,
    field: 'name' | 'quantity',
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setValue('ingredients', newIngredients);
  };

  const removeIngredient = (index: number) => {
    setValue(
      'ingredients',
      ingredients.filter((_, i) => i !== index)
    );
  };

  const addInstruction = () => {
    setValue('instruction', [...instruction, '']);
  };

  const updateInstruction = (index: number, value: string) => {
    const newinstruction = [...instruction];
    newinstruction[index] = value;
    setValue('instruction', newinstruction);
  };

  const removeInstruction = (index: number) => {
    setValue(
      'instruction',
      instruction.filter((_, i) => i !== index)
    );
  };

  const addNote = () => {
    setValue('notes', [...notes, '']);
  };

  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setValue('notes', newNotes);
  };

  const removeNote = (index: number) => {
    setValue(
      'notes',
      notes.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: RecipeFormData) => {
    if (initialData) {
      try {
        const res: any = await updateRecipe(data);
        toast.success(res.message);
        router.push('/admin/dashboard/recipeLists');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    } else {
      try {
        const res: any = await addRecipe(data);
        console.log('client', res);
        toast.success(res);
        router.push('/admin/dashboard/recipeLists');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
    reset();
  };
  return (
    <Card className="max-h-[calc(100vh-12rem)] flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <Tabs defaultValue="basic" className="flex-1">
          <TabsList className="sticky top-0 z-10 w-full grid grid-cols-4 bg-background">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 h-[calc(100vh-20rem)] px-6 my-6 py-4">
            <TabsContent value="basic" className="space-y-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Label htmlFor="name">Recipe name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                    placeholder="Enter recipe name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    className={errors.description ? 'border-destructive' : ''}
                    placeholder="Describe your recipe"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Category</Label>
                  <Controller
                    name="recipeCategory"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        instanceId="category-select"
                        options={categoryOptions}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="Select categories"
                        onChange={(selected) =>
                          field.onChange(
                            selected.map((item) => {
                              return {
                                id: item.id,
                                name: item.name,
                              };
                            })
                          )
                        }
                      />
                    )}
                  />
                  {errors.recipeCategory && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.recipeCategory.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cuisine">Cuisine</Label>
                  <Input
                    id="cuisine"
                    {...register('cuisine')}
                    className={errors.cuisine ? 'border-destructive' : ''}
                    placeholder="e.g., Italian, Mexican, etc."
                  />
                  {errors.cuisine && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.cuisine.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="prepTime">Preparation Time</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    {...register('prepTime', { valueAsNumber: true })}
                    className={errors.prepTime ? 'border-destructive' : ''}
                    placeholder="e.g., 30 minutes"
                  />
                  {errors.prepTime && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.prepTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cookTime">Cooking Time</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    {...register('cookTime', { valueAsNumber: true })}
                    className={errors.cookTime ? 'border-destructive' : ''}
                    placeholder="e.g., 45 minutes"
                  />
                  {errors.cookTime && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.cookTime.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="serves">Serves</Label>
                  <Input
                    id="serves"
                    {...register('serves')}
                    className={errors.serves ? 'border-destructive' : ''}
                    placeholder="Number of serves"
                  />
                  {errors.serves && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.serves.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    {...register('rating', { valueAsNumber: true })}
                    className={errors.rating ? 'border-destructive' : ''}
                    placeholder="Recipe rating (0-5)"
                  />
                  {errors.rating && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
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
                      />
                    )}
                  />
                  {errors.recipeTag && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.recipeTag.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>Ingredients</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addIngredient}
                    >
                      Add Ingredient
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-3">
                        <Input
                          placeholder="Ingredient name"
                          value={ingredient.name}
                          onChange={(e) =>
                            updateIngredient(index, 'name', e.target.value)
                          }
                        />
                        <Input
                          placeholder="Quantity"
                          value={ingredient.quantity}
                          onChange={(e) =>
                            updateIngredient(index, 'quantity', e.target.value)
                          }
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
                  </div>
                </div>
                {errors.ingredients && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.ingredients.message}
                  </p>
                )}
                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>instruction</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addInstruction}
                    >
                      Add Instruction
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {instruction.map((instruct, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-none w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <Input
                          placeholder={`Step ${index + 1}`}
                          value={instruct}
                          onChange={(e) =>
                            updateInstruction(index, e.target.value)
                          }
                          className="flex-1"
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
                  </div>
                </div>
                {errors.instruction && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.instruction.message}
                  </p>
                )}
                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>Notes</Label>
                    <Button type="button" variant="outline" onClick={addNote}>
                      Add Note
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {notes &&
                      notes.map((note, index) => (
                        <div key={index} className="flex gap-3">
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
                  </div>
                </div>
                {errors.notes && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.notes.message}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 mt-6">
              <div>
                <Label>Recipe Images</Label>
                <div className="mt-2">
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Drag & drop images here, or click to select files
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Recipe image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-background/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="sticky bottom-0 flex justify-end gap-4 p-6 bg-background border-t mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/recipes')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Recipe' : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

{
  /* <div className="col-span-2">
                  <Label>Related Recipes</Label>
                  <Controller
                    name="relatedRecipes"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={recipeOptions},
                        getOptionLabel={(e) => e.name}  // Use `name` as label
                        getOptionValue={(e) => e.id} 
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="Select related recipes"
                      />
                    )}
                  />
                  {errors.relatedRecipes && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.relatedRecipes.message}
                    </p>
                  )}
                </div> */
}

// const recipeSchema = z.object({
//   name: z.string().min(1, 'name is required'),
//   description: z.string().min(1, 'Description is required'),
//   category: z.array(z.object({ value: z.string(), label: z.string() })),
//   cuisine: z.string().min(1, 'Cuisine is required'),
//   prepTime: z.string().min(1, 'Prep time is required'),
//   cookTime: z.string().min(1, 'Cook time is required'),
//   serves: z.number().min(1, 'serves must be at least 1'),
//   rating: z.number().min(0).max(5).optional(),
//   tags: z.array(z.object({ value: z.string(), label: z.string() })),
//   relatedRecipes: z.array(z.object({ value: z.string(), label: z.string()})),
//   ingredients: z.array(z.object({
//     name: z.string().min(1, 'Ingredient name is required'),
//     quantity: z.string().min(1, 'Quantity is required')
//   })).min(1,"Ingredients can't be empty"),
//   instruction: z.array(z.string()).min(1, 'Instruction is required'),
//   notes: z.array(z.string())
// });

// const categoryOptions = [
//   { value: 'breakfast', label: 'Breakfast' },
//   { value: 'lunch', label: 'Lunch' },
//   { value: 'dinner', label: 'Dinner' },
//   { value: 'dessert', label: 'Dessert' },
//   { value: 'snack', label: 'Snack' },
// ];

// const tagOptions = [
//   { value: 'vegetarian', label: 'Vegetarian' },
//   { value: 'vegan', label: 'Vegan' },
//   { value: 'gluten-free', label: 'Gluten-Free' },
//   { value: 'quick', label: 'Quick' },
//   { value: 'easy', label: 'Easy' },
//   { value: 'healthy', label: 'Healthy' },
// ];

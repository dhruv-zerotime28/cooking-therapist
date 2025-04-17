import { z } from 'zod';
import { tag } from './tags';
import { categorySchema } from './categories';

export const recipeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Recipe Name is required'),
  description: z.string().min(1, 'Description is required'),
  images: z
    .array(z.string().url())
    .nonempty('At least one image is required'),
    // .optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, 'Ingredient name is required'),
        quantity: z.string().min(1, 'Quantity is required'),
      })
    )
    .min(1, "Ingredients can't be empty"),
  instruction: z.array(z.string()).min(1, 'Instruction is required'),
  prepTime: z.number().int().positive(),
  cookTime: z.number().int().positive(),
  cuisine: z.string().min(1, 'Cuisine is required'),
  serves: z.string(),
  notes: z.array(z.string()),
  rating: z.number().int().min(1).max(5).optional(),
  recipeTag: z.array(tag),
  recipeCategory: z.array(categorySchema),
  relatedRecipes: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type recipeSchemaType = z.infer<typeof recipeSchema>


export const reciepeDataSchema = recipeSchema.omit({
  //without id's and db dates for add req
  id: true,
  createdAt: true,
  updatedAt: true,
 
});

export const updateRecipesSchema = recipeSchema.omit({
  createdAt:true,
  updatedAt:true,
  recipeCategory:true,
  recipeTag:true,
  images:true,
}).extend({
  newUrls : z.array(z.string()),
  oldUrls : z.array(z.string()),
  removedUrls : z.array(z.string().url()).optional(),
  addedTags : z.array(tag),
  removedTags : z.array(tag),
  addedCategory : z.array(categorySchema),
  removedCategory : z.array(categorySchema),
})


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const recipeForm = reciepeDataSchema
  .omit({ images: true })
  .extend({
    recipeImages: z
      .array(z.any())
      .min(1, 'Please upload at least one image.')
      .refine(
        (files) =>
          files.every((file) =>
            typeof file === 'string' || file.size <= MAX_FILE_SIZE
          ),
        'Max image size is 5MB.'
      )
      .refine(
        (files) =>
          files.every((file) =>
            typeof file === 'string' || ACCEPTED_IMAGE_TYPES.includes(file.type)
          ),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
  });



export type RecipeFormDataType = z.infer<typeof recipeForm>;

export type recipeListSchema = z.infer<typeof recipeSchema>;

export const reciepeIdType = z.object({
  id: z.string().cuid(),
});

export interface fileDetails{
  recipeName : string,
  fileName:string,
  contentType : string 
}


export const recipeTableData = z.object({
  id: z.string().cuid(),
  name : z.string(),
  cuisine : z.string(),
  prepTime : z.number(),
  cookTime : z.number(),
  rating :z.number(),
  createdAt : z.date()
})

export type recipeTableType = z.infer<typeof recipeTableData>
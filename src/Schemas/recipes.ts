import { z } from 'zod';
import { tag } from './tags';
import { categorySchema } from './categories';

export const recipeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Recipe Name is required'),
  description: z.string().min(1, 'Description is required'),
  images: z.array(z.string().url()).nonempty('At least one image is required').optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, 'Ingredient name is required'),
        quantity: z.string().min(1, 'Quantity is required'),
      })
    )
    .min(1, "Ingredients can't be empty"),
  instruction: z.array(z.string()).min(1, 'Instruction is required'),
  prepTime: z.number().int().positive().optional(),
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

export const reciepeDataSchema = recipeSchema.omit({        //without id's and db dates for add req
  id: true,
  createdAt: true,
  updatedAt: true,
});

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE = 5000000;

export const recipeForm = reciepeDataSchema         //for whole form validation
  .omit({ images: true })
  .extend({ image: z.array(z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )).optional()
  });

  export type recipeListSchema = z.infer<typeof recipeSchema>

  export const reciepeIdType = z.object({
    id: z.string().cuid(),
  })
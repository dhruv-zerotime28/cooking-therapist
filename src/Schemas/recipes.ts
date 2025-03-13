import { z } from 'zod';


export const recipeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Recipe Name is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().url()).nonempty("At least one image is required"),
  ingredients: z.record(z.any()), // Assuming JSON can have dynamic keys
  instruction: z
    .array(z.string())
    .nonempty("At least one instruction is required"),
  prepTime: z.number().int().positive().optional(),
  cookTime: z.number().int().positive(),
  cuisine: z.string().min(1, "Cuisine is required"),
  serves: z.string().min(1, "Serving size is required"),
  notes: z.array(z.string()).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  recipeTag: z.array(z.string().cuid()).optional(), // Now an array of string IDs
  recipeCategory: z.array(z.string().cuid()).optional(), // Now an array of string IDs
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reciepeDataSchema = recipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

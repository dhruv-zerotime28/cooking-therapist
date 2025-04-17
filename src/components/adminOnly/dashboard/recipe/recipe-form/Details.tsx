'use client';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { reactSelectStyles } from '@/components/ui/react-select';
import { RecipeFormDataType } from '@/Schemas/recipes';
import { tagType } from '@/Schemas/tags';
import { Control, UseFormRegister, FieldErrors } from 'react-hook-form';

interface DetailsSectionProps {
  control: Control<RecipeFormDataType>;
  register: UseFormRegister<RecipeFormDataType>;
  errors: FieldErrors<RecipeFormDataType>;
  tagOptions?: tagType[];
}

export default function DetailsSection({
  control,
  register,
  errors,
  tagOptions,
}: DetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className='max-md:col-span-2'>
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
      <div className='max-md:col-span-2'>
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
      <div className='max-md:col-span-2'>
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
      <div className='max-md:col-span-2'>
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
              styles={reactSelectStyles}
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
  );
}

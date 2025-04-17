import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { reactSelectStyles } from '@/components/ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { RecipeFormDataType } from '@/Schemas/recipes';
import { categoryType } from '@/Schemas/categories';
import { Control, UseFormRegister, FieldErrors } from 'react-hook-form';


interface BasicInfoSectionProps {
  control: Control<RecipeFormDataType>;
  register: UseFormRegister<RecipeFormDataType>;
  errors: FieldErrors<RecipeFormDataType>;
  categoryOptions?: categoryType[];
}

export default function BasicInfoSection({ control, register, errors ,categoryOptions}:BasicInfoSectionProps ) {
  return (
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
                <div className='max-md:col-span-2'>
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
                        styles={reactSelectStyles}
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
                <div className='max-md:col-span-2'>
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
  )
}

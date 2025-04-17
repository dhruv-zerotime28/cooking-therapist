'use client';

import { Separator } from '@/components/ui/separator';
import DynamicList from './DynamicList';

export default function IngredientsSection({
  setValue,
  watch,
  errors,
}: any) {
  return (
    <div className="space-y-6">
      <DynamicList
        label="Ingredients"
        items={watch('ingredients')}
        fields={[
          { key: 'name', placeholder: 'Ingredient name' },
          { key: 'quantity', placeholder: 'Quantity' },
        ]}
        onChange={(updated) => setValue('ingredients', updated)}
        errors={errors.ingredients?.message}
      />
      <Separator />
      <DynamicList
        label="Instruction"
        items={watch('instruction')}
        fields="Instruction"
        onChange={(updated) => setValue('instruction', updated)}
        errors={errors.instruction?.message}
      />
      <Separator />
      <DynamicList
        label="Notes"
        items={watch('notes')}
        fields="Note"
        onChange={(updated) => setValue('notes', updated)}
        errors={errors.notes?.message}
      />
    </div>
  );
}

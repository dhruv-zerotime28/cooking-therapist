
import { getAllCategory,getAllRecipes } from '@/actions/admin/recipes-actions';
import { tagType } from '@/Schemas/tags';
import { categoryType } from '@/Schemas/categories';
import RecipeForm from '@/components/adminOnly/dashboard/recipe/recipe-form';
export default async function add() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Add Recipe</h1>
      <RecipeForm/>
    </div>
  );
}

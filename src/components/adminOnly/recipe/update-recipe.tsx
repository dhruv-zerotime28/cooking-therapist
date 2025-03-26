'use client '

import RecipeForm from "@/components/adminOnly/recipe/recipeForm";
import { getAllTags } from "@/actions/admin/tags-actions";
import { getAllCategories } from "@/actions/admin/categories-actions";
import { tagType } from "@/Schemas/tags";
import { categoryType } from "@/Schemas/categories";

export default async function UpdateRecipe(){
    const tags:tagType[] = await getAllTags();
    const categories:categoryType[] = await getAllCategories();

    return(
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Update Recipe</h1>
        <p>update recipe</p>
            <RecipeForm tagOptions={tags} categoryOptions={categories} />
        </div>
    )
}
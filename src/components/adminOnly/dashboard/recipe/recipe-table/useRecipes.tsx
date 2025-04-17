import { useDataFetcher } from "../../tables-common/useTablesDataFetcher";
import { recipeTableType } from "@/Schemas/recipes";
import { getAllRecipes } from "@/actions/admin/recipes-actions";

export const useRecipe = ()=>{
    return useDataFetcher<recipeTableType>(getAllRecipes);
}
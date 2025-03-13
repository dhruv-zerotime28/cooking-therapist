import RecipeForm from "@/components/adminOnly/recipe/recipeForm";

export default function add(){
    return(
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Add Recipe</h1>
            <RecipeForm/>
        </div>
    )
}
"use client";

import { useState,useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    description: "A comforting pasta dish with rich garlic cream sauce",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800",
    time: "30 mins",
    difficulty: "Easy",
    category: "Pasta",
    tags: ["Italian", "Vegetarian"],
  },
  {
    id: 2,
    title: "Mediterranean Salad",
    description: "Fresh and healthy salad with feta cheese and olives",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
    time: "15 mins",
    difficulty: "Easy",
    category: "Salads",
    tags: ["Healthy", "Mediterranean"],
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    description: "Decadent dessert with a molten chocolate center",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800",
    time: "25 mins",
    difficulty: "Medium",
    category: "Desserts",
    tags: ["Chocolate", "Baking"],
  },
  {
    id: 4,
    title: "Grilled Salmon",
    description: "Perfectly grilled salmon with lemon and herbs",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800",
    time: "20 mins",
    difficulty: "Medium",
    category: "Seafood",
    tags: ["Healthy", "Protein"],
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with tofu",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    time: "20 mins",
    difficulty: "Easy",
    category: "Vegetarian",
    tags: ["Asian", "Healthy"],
  },
  {
    id: 6,
    title: "Classic Burger",
    description: "Juicy beef burger with all the trimmings",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    time: "30 mins",
    difficulty: "Medium",
    category: "Main Course",
    tags: ["American", "Beef"],
  },
];

const categories = ["All", "Pasta", "Salads", "Desserts", "Seafood", "Vegetarian", "Main Course"];
const tags = ["All", "Italian", "Vegetarian", "Healthy", "Mediterranean", "Chocolate", "Baking", "Protein", "Asian", "American", "Beef"];

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(()=>{

  },[searchQuery,searchQuery,selectedTag])

  const router = useRouter()
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesTag = selectedTag === "All" || recipe.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
          alt="Recipes background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Our Recipes</h1>
          <p className="max-w-2xl text-lg">
            Explore our collection of delicious recipes for every occasion
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 z-10 border-b bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:mx-60 my-4 px-2">
        <div className="">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16">
        <div className="">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mx-60 px-2">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="group overflow-hidden py-0"  onClick={()=>{router.push(`recipes/${recipe.id}`)}}>
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-xl">{recipe.title}</CardTitle>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {recipe.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <span className="text-sm text-muted-foreground">
                    ⏱ {recipe.time}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    📊 {recipe.difficulty}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
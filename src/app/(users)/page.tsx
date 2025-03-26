'use Client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown} from "lucide-react";
// import { motion } from "framer-motion";
import { Instagram , Facebook,  Youtube ,Twitter} from 'lucide-react';

const topRatedRecipes = [
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
];

const categories = [
  {
    title: "Quick & Easy",
    image: "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?auto=format&fit=crop&q=80&w=800",
    count: 45,
  },
  {
    title: "Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    count: 32,
  },
  {
    title: "Desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    count: 28,
  },
  {
    title: "Vegetarian",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&q=80&w=800",
    count: 36,
  },
];
const posts = [
  { id: 1, image: "/images/post1.jpg" },
  { id: 2, image: "/images/post2.jpg" },
  { id: 3, image: "/images/post3.jpg" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="/heroImg.jpg"
          alt="Cooking background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Change the way you Cook
            <br />
            <span className="text-primary">Cooking Therapy</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
          Transform your kitchen into a space of creativity, comfort, and wellness. Explore thoughtfully curated recipes and mindful cooking guides that nourish both your body and soul.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" className=" hover:secondary" asChild>
              <Link href="/recipes">Explore Recipes</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white  hover:bg-white hover:text-primary text-primary text-md">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="absolute bottom-8 left-1/2 animate-bounce -translate-x-1/2">
            <ChevronDown className="h-8 w-8" />
          </div>
        </div>
      </section>
      {/* Mission Statement */}
      <section className="bg-muted py-16">
        <div className="">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
            At Cooking Therapist, our mission is to inspire mindful cooking as a form of self-care, creativity, and healing. We believe that the kitchen is more than just a place to prepare meals—it’s a sanctuary where flavors, emotions, and well-being come together. Through thoughtfully curated recipes and expert cooking guides, we empower individuals to find joy, relaxation, and nourishment in every dish they create.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 xl:mx-60">
        <div className="">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Popular Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link href={`/recipes?category=${category.title.toLowerCase()}`} key={category.title}>
                <Card className="group overflow-hidden py-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40">
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-xl font-semibold">{category.title}</h3>
                          <p className="text-sm">{category.count} Recipes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))} 
          </div>
        </div>
      </section>

      {/* Top Rated Recipes */}
      <section className="bg-muted py-16 ">
        <div className="">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl ">Top Rated Recipes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:mx-60">
            {topRatedRecipes.map((recipe) => (
              <Card key={recipe.id} className="group overflow-hidden py-0">
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
                  <p className="mb-4 text-sm text-muted-foreground">{recipe.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <span className="text-sm text-muted-foreground">⏱ {recipe.time}</span>
                  <span className="text-sm text-muted-foreground">📊 {recipe.difficulty}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/recipes">View All Recipes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-green-100 p-4 dark:bg-green-900">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quick & Easy</h3>
              <p className="text-muted-foreground">
                Delicious meals in 30 minutes or less, perfect for busy weekdays
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-green-100 p-4 dark:bg-green-900">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Curated with Love</h3>
              <p className="text-muted-foreground">
                Carefully selected recipes tested by our expert chefs
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-green-100 p-4 dark:bg-green-900">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Guaranteed Success</h3>
              <p className="text-muted-foreground">
                Step-by-step instructions ensuring perfect results every time
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
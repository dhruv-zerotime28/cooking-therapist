'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ImagesAndInfoWindow,ImagesAndInforMobile } from '@/components/usersOnly/reciepesById/responsiveDesign';
const Reciepe = () => {
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    //make the api call here when got the dynamic id
  });
  const reciepeData = {
    title:
      'Broccoli Kadhi / Broccoli in Yogurt Sauce / Indian Style Broccoli Curry',
    prepTime: '15 mins',
    cookTime: '15 mins',
    totalTime: '30 mins',
    description:
      'Broccoli kadhi is an Indian-style broccoli and potato curry in a yogurt and chickpea flour sauce, flavored with Indian spices. Serve it with chapati, rice, or quinoa.Curries are the everyday part of the Indians, and now a days broccoli is getting more popular that most of the people know about it. So here is my one more successful experiment with broccoli is Broccoli Kadhi. Kadhi is very popular side dish of India which is basically a cooked mixture of yogurt and chickpea flour/besan and seasoned with spices and herbs. All the different part of India people makes it with their unique twist.I have adapted broccoli kadhi recipe from north indian style kadhi pakora recipe in which they use chickpea dumplings in the yogurt sauce. I have converted those fried dumplings into blanched broccoli florets and potatoes.  Some spices in the recipe like turmeric, ginger garlic and roasted coriander seeds gives great flavor to this curry.',
    author: 'Cookingtherapist',
    recipeType: 'Side',
    cuisine: 'Indian',
    serves: '2-3 persons',
    ingredients: [
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Chickpea flour (Besan)', quantity: '4 tbsp' },
      { name: 'Broccoli', quantity: '1½ cup lightly blanched' },
      { name: 'Boiled Potato', quantity: '½ cup diced' },
      { name: 'Oil', quantity: '½ tbsp' },
      { name: 'Onion', quantity: '½ cup julienne' },
      { name: 'Ginger garlic chili paste', quantity: '1 tbsp' },
      { name: 'Cumin seed', quantity: '1 tsp' },
      { name: 'Coriander seed', quantity: '2 tsp crushed' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Coriander powder', quantity: '1 tsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Water', quantity: '2 cups (or as needed)' },
      { name: 'Cilantro', quantity: '2-3 tbsp' },
    ],
    instructions: [
      'In a bowl, whisk yogurt and chickpea flour well to avoid lumps. Add required water and mix thoroughly.',
      'Heat oil in a medium-sized pan on medium flame. Add cumin seeds, crushed coriander seeds, and onions. Sauté until translucent.',
      'Add ginger garlic green chili paste and sauté for a minute.',
      'Add turmeric and the yogurt-chickpea flour mixture. Let it simmer on medium-low heat, stirring continuously.',
      'Once it thickens, add broccoli and potato. Cook for another 3-4 minutes on medium flame.',
      'Taste and check for doneness. Adjust water consistency as needed.',
      'Turn off the heat and add cilantro.',
      'Serve hot with rice, roti, or quinoa.',
    ],
    notes: [
      "Don't overcook the broccoli while blanching.",
      'Adjust water consistency based on the desired thickness.',
    ],
    img: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
        alt: 'Broccoli Kadhi by Cooking Therapist',
      },
      {
        url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
        alt: 'Punjabi Kadhi Pakora by Vegan Richa',
      },
      {
        url: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800',
        alt: 'Dahi Broccoli by Zheelicious',
      },
    ],
    tags: ['vegetarian', 'gluten-free', 'high-protein', 'comfort food'],
    categories: ['vegetarian', 'gluten-free', 'high-protein', 'comfort food'],
    relatedDishes: ['brocali bhajiya', 'borcali vada', 'brokali kadi'],
  };

  return (
    <div className="container mx-auto mt-8 px-4 lg:px-0">
      {/* Recipe Title and Meta */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-primary lg:text-4xl">
          {reciepeData.title}
        </h1>
        <div className="mt-2 flex flex-wrap justify-between text-sm">
          <div className="flex flex-wrap items-center">
            <span>April 17, 2018</span>
            <span className="mx-2">•</span>
            <span>Author: {reciepeData.author}</span>
            <span className="mx-2">•</span>
            <span>Cuisine: {reciepeData.cuisine}</span>
          </div>
          <div className="flex items-center">
            Rating:
            <span className="text-green-500">
              <Star className="inline-block" size={16} />
              <Star className="inline-block" size={16} />
              <Star className="inline-block" size={16} />
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="lg:flex">
        {/* Left Side: Recipe Details */}
        <div className="lg:w-2/3 lg:pr-8">
          {/* Time Information */}
          <div className="mb-4 flex justify-between rounded bg-card p-4 text-secondary">
            <div>
              Prep Time:{' '}
              <span className="font-semibold">{reciepeData.prepTime}</span>
            </div>
            <div>
              Cook Time:{' '}
              <span className="font-semibold">{reciepeData.cookTime}</span>
            </div>
            <div>
              Total Time:{' '}
              <span className="font-semibold">{reciepeData.totalTime}</span>
            </div>
          </div>

          {/* Mobile: Image and Tags/Categories */}
          <ImagesAndInforMobile
            images={reciepeData.img}
            tags={reciepeData.tags}
            categories={reciepeData.categories}
          />

          {/* Description */}
          <div className="mb-6 rounded bg-secondary p-4 text-justify">
            {reciepeData.description}
          </div>

          {/* Ingredient List */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">
              Ingredients
            </h2>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Ingredient</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reciepeData.ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {ingredient.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {ingredient.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Instructions */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">
              Instructions
            </h2>
            <ol className="list-decimal pl-6">
              {reciepeData.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </section>

          {/* Notes */}
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">Notes</h2>
            <ul className="list-disc pl-6">
              {reciepeData.notes.map((note, index) => (
                <li key={index} className="mb-2">
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Side: Image Gallery and Meta Information */}
        <ImagesAndInfoWindow
          images={reciepeData.img}
          tags={reciepeData.tags}
          categories={reciepeData.categories}
        />
      </div>

      {/* Related Dishes */}
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold text-primary">
          Related Dishes
        </h2>
        <ul className="list-none pl-0">
          {reciepeData.relatedDishes.map((dish, index) => (
            <li key={index} className="mb-1">
              {dish}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Reciepe;

// <div className="lg:sticky lg:top-4 lg:w-1/3">
// {/* Image Carousel (Hidden on Small Screens) */}
// <div className="mb-6 hidden lg:block">
//   <Carousel>
//     <CarouselContent>
//       {reciepeData.images.map((image, index) => (
//         <CarouselItem
//           key={index}
//           className="relative w-full h-[600px]"
//         >
//           <Image
//             src={image.url}
//             alt="img"
//             fill
//             className="rounded-lg object-cover"
//           />
//         </CarouselItem>
//       ))}
//     </CarouselContent>
//   </Carousel>
// </div>

// {/* Categories and Tags (Hidden on Small Screens) */}
// <div className="mb-6 hidden lg:block">
//   <h3 className="text-lg font-semibold text-primary mb-2">
//     Categories
//   </h3>
//   <div className="flex flex-wrap gap-2">
//     {reciepeData.categories.map((category, index) => (
//       <span
//         key={index}
//         className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
//       >
//         {category}
//       </span>
//     ))}
//   </div>
// </div>

// <div className="mb-6 hidden lg:block">
//   <h3 className="text-lg font-semibold text-primary mb-2">Tags</h3>
//   <div className="flex flex-wrap gap-2">
//     {reciepeData.tags.map((tag, index) => (
//       <span
//         key={index}
//         className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
//       >
//         {tag}
//       </span>
//     ))}
//   </div>
// </div>
// </div>

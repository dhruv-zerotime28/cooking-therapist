import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Home Cook',
    content:
      'Cooking Therapist has transformed my relationship with cooking. The recipes are easy to follow and always delicious!',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Michael Chen',
    role: 'Food Enthusiast',
    content:
      "I've discovered so many new flavors and techniques through this platform. It's become my go-to resource for cooking inspiration.",
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Culinary Student',
    content:
      'The detailed instructions and tips have helped me improve my cooking skills significantly. Thank you, Cooking Therapist!',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000"
          alt="Kitchen background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">About Us</h1>
          <p className="max-w-2xl text-lg">
            Discover the story behind Cooking Therapist and our passion for
            culinary excellence
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 xl:mx-60 ">
        <div className="">
          <div className="mx-auto max-w-full text-center">
            <h2 className="mb-6 text-3xl font-bold">My Story</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Hello There, I’m Ami. Thanks for stopping by. I am a physical
              therapist by profession, cook at heart, recipe developer, my
              family’s nutritionist and a mommy. Here I am going to share
              healthy, tasty and creative – vegetarian, Vegan and egg free
              recipes; so stay tuned! Since childhood I was very interested in
              cooking and have learned a lot of kitchen wisdom from my mommy and
              grandma. I am very passionate about traveling to new places and
              learning new cuisines from all around the world. Along with my
              physical therapy education, I have acquired deep professional
              medical knowledge about food and nutrition. Cooking Therapist blog
              is an attempt to create best recipes to promote healthy cooking
              and get optimum nutrition without compromising taste. It is a
              fresh and modern take on some of the traditional recipes with
              focus on health value and nutrition.
            </p>
            <p className="text-lg text-muted-foreground">
              Here, you'll find a variety of dishes crafted with fresh, natural
              ingredients—perfect for those who are health-conscious,
              environmentally mindful, or simply love good food. Whether you're
              new to veganism or a seasoned plant-based eater, our recipes cater
              to all levels and tastes. Join us on this journey to discover
              flavorful, nourishing meals that support your well-being and the
              planet. Let's cook, eat, and thrive together!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16">
        <div className="">
          <h2 className="mb-8 text-center text-3xl font-bold">
            What Our Users Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3 xl:mx-60">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    {testimonial.content}
                  </p>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

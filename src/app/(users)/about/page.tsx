import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Cook",
    content: "Cooking Therapist has transformed my relationship with cooking. The recipes are easy to follow and always delicious!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Michael Chen",
    role: "Food Enthusiast",
    content: "I've discovered so many new flavors and techniques through this platform. It's become my go-to resource for cooking inspiration.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Emily Rodriguez",
    role: "Culinary Student",
    content: "The detailed instructions and tips have helped me improve my cooking skills significantly. Thank you, Cooking Therapist!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
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
            Discover the story behind Cooking Therapist and our passion for culinary excellence
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Founded in 2025, Cooking Therapist began with a simple idea: cooking should be both therapeutic and delicious. We believe that the kitchen is not just a place to prepare meals, but a sanctuary where creativity flows and stress melts away.
            </p>
            <p className="text-lg text-muted-foreground">
              Our team of passionate food lovers and experienced chefs works tirelessly to bring you carefully curated recipes, cooking tips, and culinary inspiration. We're dedicated to helping you discover the joy of cooking while creating memorable meals for yourself and your loved ones.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16">
        <div className="">
          <h2 className="mb-8 text-center text-3xl font-bold">What Our Users Say</h2>
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
                  <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
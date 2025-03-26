"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter ,Youtube} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";


export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="py-12 xl:mx-60 px-2 ">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-4">
        <div className="max-sm:text-center flex justify-center">
          <Image
              src="/fullLogo.png"
              width={400}
              height={50}
              alt="logo"
              className="mix-blend-darken dark:mix-blend-lighten"
             />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold ">Quick Links</h3>
            <ul className="mt-4 space-y-2 ">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
              <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground">
                  Recipes
              </Link>
              </li>
              <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
              </Link>
              </li>
              <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
              </Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Popular Tags</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Vegetarian
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Gluten-Free
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  30-Minute Meals
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Budget-Friendly
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center ">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4 justify-center">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* <div className="max-sm:text-center">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to get the latest recipes and cooking tips.
            </p>
            <form className="mt-4 flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[200px]"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div> */}
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cooking Therapist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
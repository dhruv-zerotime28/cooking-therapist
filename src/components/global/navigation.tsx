"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Home, Book, Info, Mail } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/recipes", label: "Recipes", icon: Book },
  { href: "/about", label: "About", icon: Info },
  { href: "/contactUs", label: "Contact", icon: Mail },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    // <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
    //   <div className="flex h-16 items-center xl:mx-40">
    //    <div className="">
    //    <Link href="/" className="flex items-center ">
    //      <img src="/logo.svg" alt="logo" className="h-auto max-h-20 w-auto " />
    //     </Link>
    //    </div>
    //     <nav className="flex flex-1 items-center justify-center space-x-1 sm:space-x-6">
    //       {navItems.map(({ href, label, icon: Icon }) => (
    //         <Link
    //           key={href}
    //           href={href}
    //           className={cn(
    //             "flex items-center space-x-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
    //             pathname === href
    //               ? "bg-accent text-accent-foreground"
    //               : "text-foreground/60 hover:text-foreground"
    //           )}
    //         >
    //           <Icon className="h-4 w-4" />
    //           <span className="hidden sm:inline-block">{label}</span>
    //         </Link>
    //       ))}
    //     </nav>
    //     <div className="flex items-center space-x-4">
    //       <ModeToggle />
    //     </div>
    //   </div>
    // </header>
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="relative flex h-16 items-center xl:mx-40">
    
    {/* Logo (Left) */}
    <div className="flex-[0.4] max-sm:flex-[0.6] flex items-center">
      <Link href="/" className="flex items-center">
        <img src="/logo.svg" alt="logog" className=" " />
      </Link>
    </div>

    {/* Navigation (Centered) */}
    <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-1 sm:space-x-6">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center space-x-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
            pathname === href
              ? "bg-accent text-accent-foreground"
              : "text-foreground/60 hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline-block">{label}</span>
        </Link>
      ))}
    </nav>

    {/* Mode Toggle (Right) */}
    <div className="flex-1 flex justify-end items-center space-x-4">
      <ModeToggle />
    </div>

  </div>
</header>

  );
}


 {/* <ChefHat className="h-6 w-6 text-green-500" />
          <span className="hidden font-bold sm:inline-block">
            Cooking Therapist
            {/* <img src="/logo.png" alt="logo" className=""/> */}
          {/* </span> */} 
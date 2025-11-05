"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react"; // শুধু ব্যবহার হচ্ছে তাই মাত্র এইগুলো রাখলাম
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
const { setTheme } = useTheme();

return ( <nav className="p-4 flex items-center justify-between fixed top-0 w-full bg-white dark:bg-gray-900 shadow z-50">
{/* Left Side */} <div className="flex items-center gap-4 ml-[5rem]"> <SidebarTrigger />

```
    {/* Home Link */}
    <Link
      href="/"
      className="border border-red-500 h-9 w-20 hover:text-sky-700 hover:border-sky-700 transition-colors text-center p-2 rounded flex items-center justify-center"
    >
      Home
    </Link>

    {/* Theme Toggle */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</nav>


);
};

export default Navbar;

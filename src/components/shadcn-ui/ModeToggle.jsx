"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'Luffy', theme: 'luffy' },
    { name: 'Zoro', theme: 'zoro' },
    { name: 'Nami', theme: 'nami' },
    { name: 'Usopp', theme: 'usopp' },
    { name: 'Sanji', theme: 'sanji' },
    { name: 'Chopper', theme: 'chopper' },
    { name: 'Robin', theme: 'robin' },
    { name: 'Franky', theme: 'franky' },
    { name: 'Brook', theme: 'brook' },
    { name: 'Default', theme: 'default' },
  ];
  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // console.log(theme)

  

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="mx-4" >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      {themes.map((item) => (
          <DropdownMenuItem key={item.theme} onClick={() => toggleTheme(item.theme)}>
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

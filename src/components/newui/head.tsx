import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ThemeProvider } from "@/components/shadcn-ui/theme-provider"

import AvatarUse from "@/components/shadcn-ui/AvatarUse"
import { ModeToggle } from "@/components/shadcn-ui/ModeToggle"
import DropDown from "@/components/shadcn-ui/DropDown"
import Headerr from "@/components/newui/head"

function RHeader() {
  return (
    <> 
    
    <section className="bg-black py-10"> {/* Increased padding for better spacing */}
      <div className="max-w-screen-xl mx-auto px-4"> {/* Center content with max-width */}
        <div className="flex items-center justify-between">
          <div className="flex items-center"> {/* Center the logo and text */}

          <Link href="/">
            
     
  
            <img
              className="rounded-full"
              src="https://ih1.redbubble.net/image.3440946030.3036/raf,750x1000,075,t,101010:01c5ca27c6.jpg"
              
              width="40"
              height="40"
            />

            <ModeToggle />

              </Link>
            <h1 className="text-white ml-2 text-2xl font-bold">Welcome to Gym Guardian</h1>
          </div>
          <p className="text-sm text-gray-400">
             &nbsp; B & D Developers
          </p>
          <DropDown display={"≡≡≡"} label={"Select a page"} items={"Home"}/>
        </div>
      </div>
    </section></>

  );
}

export default RHeader;




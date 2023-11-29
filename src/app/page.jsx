
import Image from 'next/image'
import { TypographyH1, TypographyP } from '@/components/typography/Typography'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import Hero from '@/components/shadcn-ui/Hero'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { DotPattern } from '@/components/page-layouts/DotPattern'
import { getServerSession } from "next-auth"


export default async function Home() {

  const session = await getServerSession()
  return (

    <div className="relative flex items-start justify-center w-full h-screen overflow-hidden border rounded-2xl border-white/10 bg-white/5">
    <DotPattern
      size={32}
      radius={1.5}
      offset-x={0}
      offset-y={0}
      className="absolute inset-0 h-4/5 w-full fill-white/10 [mask-image:radial-gradient(white,transparent_85%)]"
    />
      {/* <div className='top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover bg-img backdrop-blur z-1'> */}
      <div className= "relative flex justify-center w-full p-5 m-5 text-transparent h-1/2 bg-gradient-to-b from-white/50 to-white bg-clip-text sm:font-size-14 md:font-size-16 lg:font-size-18">
        {/* <div className='absolute top-0 left-0 right-0 bg-black/60 z-[2]'/> */}
        <div className='flex flex-col p-5 text-white z-[2] justify-between  h-full'>
        
          
          <Link href="/builder" className={buttonVariants({ variant: "default" })+ "  shadow-md shadow-black/50 text-white"}>View My Workouts</Link>
          <Link href="/builder" className={buttonVariants({ variant: "secondary" })+ "  shadow-md shadow-black/50 text-white"}>Create New Workout</Link>
          <Link href="/data-display" className={buttonVariants({ variant: "default" })+ " shadow-md shadow-black/50 text-white"}>My Workout Data</Link>
          <Link href="/calender" className={buttonVariants({ variant: "secondary" })+ "  shadow-md shadow-black/50 text-white"}>Calendar</Link>

        </div>

    </div>
      

    </div>

    
    // <main className="flex min-h-screen p-5 justify-evenly">
    //  <TypographyH1 text={"Hellooooo"}/>



    // </main>

  )
}

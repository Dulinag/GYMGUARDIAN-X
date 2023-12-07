
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
import { TypographyH1, TypographyMuted, TypographyP, TypographyH3 } from '@/components/typography/Typography'
import { workouts } from '@/data/WorkoutData'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import UserWorkout from "@/components/helpers/UserWorkout"

export default async function Builder() {
    const session = await getServerSession()
    
    if(!session || !session.user){
        redirect("/api/auth/signin")
    }

    
  return (
    <>
     <Card className={`flex m-to items-center justify-center h-screen mb-12 bg-fixed bg-center bg-img bg-no-repeat bg-cover`}>
        <Card className="items-center bg-primary">
            <CardHeader>
                <TypographyH1 text={'Builder'}/>
                <TypographyP text={"Use this page to start building your own workout!"}/>
            </CardHeader>
          
        </Card>
     
        <CardContent className="">
            <div className="p-4 space-x-4 ">
                <Card className="p-4 bg-primary">
                    <TypographyH3 text={"Select an area of focus..."} />
                </Card>
                
                {
                workouts.map((item) => {
                    return(
                        <div className='flex justify-center m-4 ' key={item.id}>
                         <Link 
                            href={{
                                pathname: `builder/${item.muscle_group}`,
                                query: {
                                    exercises: item.exercises
                                }
                            } }
                      
                            className={buttonVariants({ variant: "secondary" }) + "text-secondary"}
                            >{item.muscle_group}
                        </Link>
                        </div>
                   
                    )
                })
            }
            </div>
        </CardContent>
    </Card>
    <UserWorkout sessionData={session.user} />
    </>
   
  )
}

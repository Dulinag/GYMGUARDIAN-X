"use client"
import {useEffect, useState} from 'react'
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
  import { TypographyH1, TypographyMuted, TypographyP, TypographyH3 } from '@/components/typography/Typography'
import { useBuilderContext } from '@/context/exercise-context'


export default function UserWorkout({sessionData}) {
    const {name, email} = sessionData
    const { workoutId, setWorkoutId } = useBuilderContext()
    const [workout, setWorkout] = useState()

    useEffect(() => {
          const fetchEditWorkout = async () =>{
            try{
                const response = await fetch(`http://localhost:3000/api/activeWorkout`,
                {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                  },}
                )
                if (response.ok) {
                  const data = await response.json();
                  setWorkoutId(data.data._id)
                  console.log(data.data);
                } else {
                  console.error("Error:", response.status, response.statusText);
                }

            }catch (error){
                console.error("Error")
            }
        }
        fetchEditWorkout()
        // const createNewWorkout = async () => {
      
        //     try {
        //       const response = await fetch('http://localhost:3000/api/workout', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //           name: name,
        //         }),
        //       });
      
        //       if (!response.ok) {
        //         // Handle non-OK responses
        //         console.error('Failed to fetch data:', response.statusText);
        //         return;
        //       }
      
        //       // Process the response data if needed
        //       const data = await response.json();
        //       const workoutId = data.data._id
        //       setWorkoutId(workoutId)
        //       console.log('Data received:', data);
        //     } catch (error) {
        //       // Handle errors during the fetch
        //       console.error('Error fetching data:', error);
        //     }
        //   };
      
        //   // createNewWorkout();
        // }
      
    }, [workoutId])

    if(workoutId){
      const fetchWorkout = async () =>{
        try{
            const response = await fetch(`http://localhost:3000/api/workout?${workoutId}`,
            {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
              },}
            )
            if (response.ok) {
              const data = await response.json();
              console.log(data.data);
              setWorkout(data.data)
              
            } else {
              console.error("Error:", response.status, response.statusText);
            }
        }catch (error){
            console.error("Error")
        }
        fetchWorkout()
    }
  }
    console.log(workout, workoutId)
  return (
    <>
    <Card className="m-4">
        <CardContent>
        <CardHeader>
                <TypographyH1 text={name}/>
                <TypographyP text={"This section will track your workout as you build it!"}/>
            </CardHeader>
        </CardContent>
    </Card>
    </>
    
  )
}

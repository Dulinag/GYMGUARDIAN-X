"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
import { TypographyLarge, TypographyH1, TypographyMuted, TypographyP, TypographyH3 } from '@/components/typography/Typography'
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSearchParams } from 'next/navigation'
import TableRowComponent from '@/components/helpers/TableRowComponent'
import exercisesData from '@/data/GYM-GUARDIAN.Exercises'
import { useBuilderContext } from '@/context/exercise-context'

// import { getExercises } from '@/api-requests/exercises-requests'

export default function AreaOfFocus() {
  const {area} = useParams()

  const [exercisesState, setExerciseState] = React.useState({
    exercises: [],
  })

  const { workoutId, setWorkoutId } = useBuilderContext()
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    return () => {
      
      let activeGroup = exercisesData.filter((item) => item.muscle_group === area)
      console.log(activeGroup[0])
      
      setExerciseState({
        ...exercisesState,
        exercises:activeGroup[0].exercises,
      })
    };
  }, [])


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/exercises?muscle_group=${area}`, {
  //         method: "GET",
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`Request failed with status: ${response.status}`);
  //       }
  
  //       const res = await response.json();
  //       // console.log(res.data[0].exercises);
  //       setExercises(res.data[0].exercises); // Assuming the response structure contains the exercises directly
  
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle the error, e.g., display an error message to the user
  //     }
  //   };
  
  //    fetchData(); 
    

  // }, []);
  // console.log(exercises)



  const handleValue = (selectedValue) => {

    const stateCopy = [...state]; // Assuming state is an object with an array property

    const existingItemIndex = stateCopy.findIndex((item) => item.name === selectedValue.name);

    if (existingItemIndex !== -1) {
      // If the item exists, update the data array
      stateCopy[existingItemIndex] = {
        ...stateCopy[existingItemIndex],
        data: [
          ...stateCopy[existingItemIndex].data,
          {
            profile: selectedValue.profile,
            reps: 0,
            weight: 0,
            notes: "",
          },
        ],
      };
    } else {
      // If the item doesn't exist, add a new entry to the state array
      stateCopy.push({
        name: selectedValue.name,
        data: [
          {
            profile: selectedValue.profile,
            reps: 0,
            weight: 0,
            notes: "",
          },
        ],
      });
    }
    
    setState(stateCopy)
  };
  

  const handleDelete = (index, i, name) => {
    
    setState((prevState) =>{
      const updatedData = prevState[index].data.filter((item, currentIndex) => currentIndex !== i);
      return [
        ...prevState.slice(0, index),
        {
          name: name,
          data: updatedData,
        },
        ...prevState.slice(index + 1),
      ];
    
      })
    
  };
  

  const handleChange = (rowIndex, key, value, dataRowIndex) => {
    
    setState((prevState) => {
      // Create a copy of the state
      const updatedState = [...prevState];
      console.log( updatedState[rowIndex].data)
      updatedState[rowIndex].data[dataRowIndex][key] = value;
  
      return updatedState;
    });
  };

  const updateExerciseData = (data) => {
    console.log(workoutId, data)
    const submitData = async () => {
      try{
        const response = await fetch(`http://localhost:3000/api/workout`,
        {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
          body: JSON.stringify({
            id: workoutId,
            data: data
          })
        }

        )
        if (response.ok) {
          const data = await response.json();
          
          console.log(data.data);
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      }
      catch(error){
        console.error("Error")
      }
    }
    submitData()
    
  }
  

  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className={`m-4 bg-primary text-primary shadow-slate-100 shadow-2xl w-3/4`}>
        <CardHeader className="items-center text-slate-800">
            <TypographyH1 text={area}/>
            <TypographyP text={"Use this page to start building your own workout! If the exercise is not weighted, just put your body weight."}/>

            <Button
              className={"bg-secondary rounded-md"}
              onClick={() => updateExerciseData(state)}
            >
              Submit Data to Workout
            </Button>
        </CardHeader>
        <CardContent>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between mx-2 text-slate-200"
            >
             
                Select framework...
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {exercisesState.exercises ? exercisesState.exercises.map((exercise) => (
                  <CommandItem
                    key={Math.random()}
                    onSelect={() => {
                      handleValue({name: exercise.name, profile:exercise.muscle_profile})
                      setOpen(false)
                    }}
                  >
                    {exercise.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        
                      )}
                    />
                  </CommandItem>
                )) : null}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      { state ? 
        <Table>
          <TableCaption  className="text-secondary">Fill in your set details.  Set the reps, add more sets and write down any additional notes.</TableCaption>
          <TableHeader>
            <TableRow >
              <TableHead className="w-[150px] text-slate-500">Exercise</TableHead>
              <TableHead className="w-[150px] text-slate-500">Muscle Profile</TableHead>
              <TableHead className="w-[150px] text-slate-500">Reps</TableHead>
              <TableHead className="w-[150px] text-slate-500">Weight</TableHead>
              <TableHead className="w-[150px] text-slate-500">Notes</TableHead>
              <TableHead className="w-[150px] text-slate-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            state ? state.map((item, i) => {
             

              return(
              <TableRowComponent
                key={i}
                data={item.data}
                name={item.name}
                index={i}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />)
            }) : null
          }
           
          </TableBody>
        </Table>
        :
        null
      }
        </CardContent>
      
     
    </Card>

    <div>
     
      </div>
    </div>
  )
}

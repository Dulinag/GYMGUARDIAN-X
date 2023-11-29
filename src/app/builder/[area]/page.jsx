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

// import { getExercises } from '@/api-requests/exercises-requests'

export default function AreaOfFocus() {
  const {area} = useParams()


  const [exercisesState, setExerciseState] = React.useState({
    exercises: [],

  })
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
    console.log(selectedValue);

    
    setState((prevState) => {
      console.log(prevState)
      return [
        ...prevState,
        {
          name: selectedValue.name,
          data: [
            {
              profile: selectedValue.profile,
              reps: 0,
              weight: 0,
              notes: "",
            },
          ],
        },
      ];
    });
  };
  

  const handleDelete = (index) => {
    const newValue = state.filter((item, i) => i !== index);
    setState(newValue);
  };
  

  const handleChange = (rowIndex, key, value) => {
    console.log(state)
    setState((prevState) => {
      // Create a copy of the state
      const updatedState = [...prevState];

      updatedState[rowIndex].data[0][key] = value;
  
      return updatedState;
    });
  };

  console.log(state)
  

  
  return (
    <div className="flex justify-center w-full h-full">
      <Card className={`m-4 bg-primary text-primary shadow-slate-100 shadow-2xl`}>
        <CardHeader className="items-center text-slate-800">
            
            <TypographyH1 text={area}/>
            <TypographyP text={"Use this page to start building your own workout! If the exercise is not weighted, just put your body weight."}/>
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
              <TableHead className="w-[150px] text-slate-500">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            state.map((item, i) => {
              console.log(item.data)

              return(
              <TableRowComponent
                key={i}
                profile={item.data.profile}
                name={item.name}
                reps={item.data.reps}
                weight={item.data.weight}
                notes={item.data.notes}
                i={i}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />)
            })
          }
           
          </TableBody>
        </Table>
        :
        null
      }
        </CardContent>

      {/* <Button
      
        className={"bg-primary"}
        onClick={() => console.log(value)}
      >
        Submit Set Data
      </Button> */}
    </Card>
    </div>
  )
}

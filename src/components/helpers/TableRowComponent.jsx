// TableRowComponent.js

import React from "react";
import { Button } from "@/components/ui/button"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const TableRowComponent = ({
  name,
  data,
  index,
  handleChange,
  handleDelete,
}) => {
console.log(name, data)

  const [display, setDisplay] = React.useState(true)

  

  return (
    <>
    {
    data ?
    <TableRow className="justify-center h-10 bg-secondary">
      <TableCell colSpan={5} >
        <p className="text-lg hover:text-white">
          {name + ` x ${data.length}`}
        </p>
        
      </TableCell>
      <TableCell className="justify-end">
        <Button variant='link'>
        {
          display ? <ChevronDownIcon className="w-10 h-7" onClick={() => setDisplay(false)}/> :
          <ChevronUpIcon className="w-10 h-7" onClick={() => setDisplay(true)}/>
        }   
        </Button>
       
      </TableCell>
    </TableRow> : null
    }
    
    {
      data ? data.map((item, i) => {


      return(
      <TableRow key={i} className={`h-10 bg-secondary/80 ${display ? '' : 'hidden'}`} id={`${name}_${i}_cell`}>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell className="font-medium">{item.profile}</TableCell>
        <TableCell >
          <Input
            key={`reps_${i}`}
            value={item.reps}
            type="number"
            min={0}
            placeholder="0"
            onChange={(e) => handleChange(index, "reps", e.target.value, i)}
          />
        </TableCell>
        <TableCell>
          <Input
            key={`weight_${i}`}
            type="number"
            placeholder="0"
            step="5"
            min={0}
            value={item.weight}
            onChange={(e) => handleChange(index, "weight", e.target.value, i)}
          />
        </TableCell>
        <TableCell>
          <textarea
            className="p-0.5 text-sm resize-y bg-inherit border-neutral-50"
            key={`notes_${i}`}
            placeholder="Notes..."
            value={item.notes}
            onFocus={(e) => {
              e.target.style.border = '1px solid grey';
            }}
            onBlur={(e) => {
                e.target.style.border = '1px solid black';
            }} 
            onChange={(e) => handleChange(index, "notes", e.target.value, i)}
          />
        </TableCell>
        <TableCell>
          <Button className="shadow-sm bg-secondary shadow-inherit" variant="ghost" onClick={() => handleDelete(index, i, name)}>
            X
          </Button>
        </TableCell>
      </TableRow>
        )
      }) : null
    }
    
    </>
    
  );
};

export default TableRowComponent;

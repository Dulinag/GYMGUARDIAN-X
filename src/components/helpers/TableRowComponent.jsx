// TableRowComponent.js

import React from "react";
import { Button } from "@/components/ui/button"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const TableRowComponent = ({
  name,
  profile,
  reps,
  weight,
  notes,
  i,
  handleChange,
  handleDelete,
}) => {

  console.log(i)
  return (
    <TableRow key={i} className="h-20 bg-secondary/80">
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{profile}</TableCell>
      <TableCell>
        <Input
          key={`reps_${i}`}
          value={reps}
          type="number"
          min={0}
          placeholder="0"
          onChange={(e) => handleChange(i, "reps", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          key={`weight_${i}`}
          type="number"
          placeholder="0"
          step="5"
          min={0}
          value={weight}
          onChange={(e) => handleChange(i, "weight", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          className="text-sm"
          key={`notes_${i}`}
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => handleChange(i, "notes", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button className="shadow-sm bg-secondary shadow-inherit" variant="ghost" onClick={() => handleDelete(i)}>
          X
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;

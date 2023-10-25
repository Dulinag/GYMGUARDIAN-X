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
  reps,
  weight,
  notes,
  index,
  handleChange,
  handleDelete,
}) => {
  return (
    <TableRow key={index}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <Input
          key={`reps_${index}`}
          value={reps}
          type="number"
          placeholder="0"
          onChange={(e) => handleChange(index, "reps", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          key={`weight_${index}`}
          type="number"
          placeholder="0"
          step="5"
          value={weight}
          onChange={(e) => handleChange(index, "weight", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          key={`notes_${index}`}
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => handleChange(index, "notes", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button variant="outline" onClick={() => handleDelete(index)}>
          X
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
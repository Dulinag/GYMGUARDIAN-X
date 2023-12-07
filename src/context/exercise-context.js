"use client"
import { createContext, useState, useContext, useMemo } from "react";

export const StateContext = createContext(null)

const initialState = ""

export default function StateContextProvider({
    children
}) {

    const [workoutId, setWorkoutId] = useState(initialState)



    return(
        <StateContext.Provider value={{workoutId, setWorkoutId}}>
            {children}
        </StateContext.Provider>
    )
}

export const useBuilderContext = () => {
    return useContext(StateContext);
  };
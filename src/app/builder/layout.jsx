import React from 'react'
import StateContextProvider from '@/context/exercise-context'

export default function BuilderLayout({children}) {
  return (
    <>
        <StateContextProvider>
           {children} 
        </StateContextProvider>
        
    </>
  )
}

"use client"

import { DotPattern } from "@/components/page-layouts/DotPattern"

export default function Page() {
  return (
    <div className="flex items-center w-screen h-screen max-w-xl mx-auto">
      <div className="relative flex items-center justify-center w-full overflow-hidden border h-80 rounded-2xl border-white/10 bg-white/5">
        <DotPattern
          size={32}
          radius={1.5}
          offset-x={0}
          offset-y={0}
          className="absolute inset-0 h-full w-full fill-white/10 [mask-image:radial-gradient(white,transparent_85%)]"
        />

        {/* <div className="relative text-4xl font-bold font-display">
          <div className="absolute inset-0 rounded-full bg-white/25 blur-2xl"></div>

          <span className="relative text-transparent bg-gradient-to-b from-white/50 to-white bg-clip-text">
            Dot Pattern
          </span>
        </div> */}
      </div>
    </div>
  )
}

  
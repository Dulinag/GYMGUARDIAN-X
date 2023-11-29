
import { DotPattern } from '@/components/page-layouts/DotPattern'

export default function Layout({children}) {
  return (
    <>
    <DotPattern
      size={32}
      radius={1.5}
      offset-x={0}
      offset-y={0}
      className=" h-auto w-full fill-white/30 [mask-image:radial-gradient(white,transparent_85%)]"
    />
    {children}
    <DotPattern
      size={32}
      radius={1.5}
      offset-x={0}
      offset-y={0}
      className="  h-full w-full fill-white/30 [mask-image:radial-gradient(white,transparent_85%)]"
    />
    </>
  )
}

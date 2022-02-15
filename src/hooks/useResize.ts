import { useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { UseResizeProps } from '../@types'

const useResize = (ref: React.MutableRefObject<null>) => {
 const [dimensions, setDimensions] = useState<UseResizeProps>()

 useEffect(() => {
  const element = ref.current!
  const resizeObserver = new ResizeObserver((entries) => {
   entries.forEach((entry) => {
    setDimensions(entry.contentRect as unknown as UseResizeProps)
   })
  })
  resizeObserver.observe(element)

  return () => resizeObserver.unobserve(element)
 }, [ref])

 return (
  dimensions || {
   width: 0,
   height: 0,
   top: 0,
   left: 0,
  }
 )
}

export default useResize

import React, { useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { IItem } from '../../views/MultilineChart'

interface IProps {
 xScale: d3.ScaleTime<number, number, never>
 yScale: d3.ScaleLinear<number, number, never>
 data: IItem[]
 color: string
 disableAnimation: boolean
}

const Area: React.FC<IProps> = function ({ xScale, yScale, data, color = 'white', disableAnimation }) {
 const ref = useRef<SVGPathElement>(null)

 React.useEffect(() => {
  if (disableAnimation) {
   d3.select(ref.current).attr('opacity', 1)
   return
  }
  d3.select(ref.current).transition().duration(750).ease(d3.easeBackIn).attr('opacity', 1)
 }, [disableAnimation])

 const d = useMemo(() => {
  const area = d3
   .area<IItem>()
   // eslint-disable-next-line camelcase
   .x(({ date }) => xScale(date))
   // eslint-disable-next-line camelcase
   .y1(({ value }) => yScale(value))
   .y0(() => yScale(yScale.domain()[0]))
  return area(data)!
 }, [xScale, yScale, data])

 return (
  <>
   <path ref={ref} d={d} fill={`url(#gradient-${color})`} opacity={0} />
   <defs>
    <linearGradient id={`gradient-${color}`} x1="0%" x2="0%" y1="0%" y2="100%">
     <stop offset="0%" stopColor={color} stopOpacity={0.2} />
     <stop offset="100%" stopColor={color} stopOpacity={0} />
    </linearGradient>
   </defs>
  </>
 )
}

export default Area

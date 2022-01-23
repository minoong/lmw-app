/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface IProps {
 type: 'vertical' | 'horizontal'
 scale: any
 ticks: number
 size: number
 transform?: string
 disableAnimation?: boolean
 className?: string
}

const GridLine: React.FC<IProps> = function ({ type, scale, ticks, size, transform, disableAnimation, className }) {
 const ref = useRef<SVGGElement>(null)

 useEffect(() => {
  const axisGenerator = type === 'vertical' ? d3.axisBottom : d3.axisLeft
  const axis = axisGenerator(scale).ticks(ticks).tickSize(-size)

  const gridGroup = d3.select(ref.current).append('g')

  if (disableAnimation) {
   gridGroup.call(axis)
  } else {
   gridGroup.transition().duration(750).ease(d3.easeLinear).call(axis)
  }

  gridGroup.select('.domain').remove()
  gridGroup.selectAll('text').remove()
  gridGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.1)')
 }, [scale, ticks, size, disableAnimation])

 // eslint-disable-next-line react/jsx-props-no-spreading
 return <g ref={ref} transform={transform} className={className!} />
}

export default GridLine

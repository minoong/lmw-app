/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { AxisScale } from 'd3'

interface IProps {
 type: 'left' | 'bottom'
 scale: any
 ticks: number
 transform: string
 tickFormat?: (domainValue: d3.AxisDomain, index: number) => string
 disableAnimation?: boolean
 className?: string
}

const Axis: React.FC<IProps> = function ({ type, scale, ticks, transform, tickFormat, disableAnimation, className }) {
 const ref = useRef<SVGGElement>(null)

 useEffect(() => {
  const axisGenerator = type === 'left' ? d3.axisLeft : d3.axisBottom
  const axis = axisGenerator(scale).ticks(ticks).tickFormat(tickFormat!)
  const axisGroup = d3.select(ref.current).append('g')

  if (disableAnimation) {
   axisGroup.call(axis)
  } else {
   axisGroup.transition().duration(750).ease(d3.easeLinear).call(axis)
  }

  axisGroup.select('.domain').remove()
  axisGroup.selectAll('line').remove()
  axisGroup.selectAll('text').attr('opacity', 0.5).attr('color', 'white').attr('font-size', '0.75rem')
 }, [scale, ticks, tickFormat, disableAnimation])

 return <g ref={ref} transform={transform} className={className!} />
}

export default Axis

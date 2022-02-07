/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { AxisScale } from 'd3'

interface IProps {
 type: 'left' | 'bottom'
 scale: d3.AxisScale<any>
 ticks: number
 transform: string
 tickFormat?: (domainValue: d3.AxisDomain, index: number) => string
 disableAnimation?: boolean
 className?: string
 anchorEl?: SVGRectElement
}

const Axis: React.FC<IProps> = function ({ type, scale, ticks, transform, tickFormat, disableAnimation, className, anchorEl }) {
 const ref = useRef<SVGGElement>(null)

 useEffect(() => {
  const axisGenerator = type === 'left' ? d3.axisLeft : d3.axisBottom
  const axis = axisGenerator(scale).ticks(ticks).tickFormat(tickFormat!)
  const axisGroup = d3.select(ref.current) as d3.Selection<SVGGElement, unknown, null, undefined>

  if (disableAnimation) {
   axisGroup.call(axis)
  } else {
   axisGroup.transition().duration(750).ease(d3.easeLinear).call(axis)
  }

  axisGroup.select('.domain').remove()
  axisGroup.selectAll('line').remove()
  axisGroup.selectAll('text').attr('opacity', 0.5).attr('color', 'white').attr('font-size', '0.75rem')
 }, [scale, ticks, tickFormat, disableAnimation])

 useEffect(() => {
  if (anchorEl) {
   d3
    .select(anchorEl)
    .on('mouseout.axisX', () => {
     d3.select(ref.current).selectAll('text').attr('opacity', 0.5).style('font-weight', 'normal')
    })
    .on('mousemove.axisX', () => {
     const [x] = d3.pointer(anchorEl)
     const xDate = (scale as d3.ScaleTime<number, number, never>).invert(x)
     const textElements = d3.select(ref.current).selectAll('text')
     const data = textElements.data()
     const index = d3.bisector((d) => d).left(data, xDate)
     textElements.attr('opacity', (d, i) => (i === index - 1 ? 1 : 0.5)).style('font-weight', (d, i) => (i === index - 1 ? 'bold' : 'normal'))
    })
  }
 }, [anchorEl, scale])

 return <g ref={ref} transform={transform} className={className!} />
}

export default Axis

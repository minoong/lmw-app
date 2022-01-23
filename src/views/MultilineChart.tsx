import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export interface IItem {
 date: Date
 marketvalue: number
 value: number
}

export type IPortfolio = {
 name: 'Portfolio'
 color: '#ffffff'
 items: IItem[]
}
export type ISchc = {
 name: 'SCHC'
 color: '#d53e4f'
 items: IItem[]
}
export type IVcit = {
 name: 'VCIT'
 color: '#5e4fa2'
 items: IItem[]
}

interface IProps {
 data: (IPortfolio | ISchc | IVcit)[]
 dimensions: {
  width: number
  height: number
  margin: {
   top: number
   right: number
   bottom: number
   left: number
  }
 }
}

const MultilineChart: React.FC<IProps> = function ({ data, dimensions }) {
 const [prevItems, setPrevItems] = useState<string[]>([])
 const svgRef = useRef<SVGSVGElement>(null)
 const { width, height, margin } = dimensions
 const svgWidth = width + margin.left + margin.right
 const svgHeight = height + margin.top + margin.bottom

 useEffect(() => {
  const xScale = d3
   .scaleTime()
   .domain(d3.extent(data[0].items, (d) => d.date) as [Date, Date])
   .range([0, width])

  const yScale = d3
   .scaleLinear()
   .domain([(d3.min(data[0].items, (d) => d.value) as number) - 50, (d3.max(data[0].items, (d) => d.value) as number) + 50])
   .range([height, 0])

  const svgEl = d3.select(svgRef.current)

  svgEl.selectAll('*').remove()

  const svg = svgEl.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const xAxis = d3
   .axisBottom(xScale)
   .ticks(5)
   .tickSize(-height + margin.bottom)

  const xAxisGroup = svg
   .append('g')
   .attr('transform', `translate(0, ${height - margin.bottom})`)
   .call(xAxis)

  xAxisGroup.select('.domain').remove()
  xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)')
  xAxisGroup.selectAll('text').attr('opacity', 0.5).attr('color', 'white').attr('font-size', '0.75rem')

  const yAxis = d3
   .axisLeft(yScale)
   .ticks(5)
   .tickSize(-width)
   .tickFormat((val) => `${val}%`)

  const yAxisGroup = svg.append('g').call(yAxis)

  yAxisGroup.select('.domain').remove()
  yAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)')
  yAxisGroup.selectAll('text').attr('opacity', 0.5).attr('color', 'white').attr('font-size', '0.75rem')

  const line = d3
   .line<IItem>()
   .x((d) => xScale(d.date))
   .y((d) => yScale(d.value))

  const lines = svg
   .selectAll('.line')
   .data(data)
   .enter()
   .append('path')
   .attr('fill', 'none')
   .attr('stroke', (d) => d.color)
   .attr('stroke-width', 3)
   .attr('d', (d) => line(d.items))

  lines.each((d, i, nodes) => {
   const element = nodes[i]
   const length = element.getTotalLength()
   if (!prevItems.includes(d.name)) {
    d3
     .select(element)
     .attr('stroke-dasharray', `${length},${length}`)
     .attr('stroke-dashoffset', length)
     .transition()
     .duration(750)
     .ease(d3.easeLinear)
     .attr('stroke-dashoffset', 0)
   }
  })
  setPrevItems(data.map(({ name }) => name))
 }, [data])

 return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
}

export default MultilineChart

import { useMemo } from 'react'
import * as d3 from 'd3'
import { IPortfolio, ISchc, IVcit } from './MultilineChart'

const useController = ({ data, width, height }: { data: (IPortfolio | ISchc | IVcit)[]; width: number; height: number }) => {
 const xMin = useMemo(() => d3.min(data, ({ items }) => d3.min(items, ({ date }) => date)), [data])!
 const xMax = useMemo(() => d3.max(data, ({ items }) => d3.max(items, ({ date }) => date)), [data])!

 const xScale = useMemo(() => d3.scaleTime().domain([xMin, xMax]).range([0, width]), [xMin, xMax, width])

 const yMin = useMemo(() => d3.min(data, ({ items }) => d3.min(items, ({ value }) => value)), [data])!
 const yMax = useMemo(() => d3.max(data, ({ items }) => d3.max(items, ({ value }) => value)), [data])!

 const yScale = useMemo(() => {
  const idention = (yMax - yMin) * 0.5

  return d3
   .scaleLinear()
   .domain([yMin - idention, yMax + idention])
   .range([height, 0])
 }, [height, yMin, yMax])

 const yScaleForAxis = useMemo(() => {
  console.log(1)
  // return d3.scaleLinear([yMin, yMax]).range([height, 0])
  return d3
   .scaleBand()
   .domain([`${yMin}`, `${yMax}`])
   .range([height, 0])
 }, [height, yMin, yMax])

 const yTickFormat = (d: any) => {
  console.log(d)
  return `${parseFloat(d) > 0 ? '+' : ''}${d3.format('.2%')(+d / 100)}`
 }

 return {
  yTickFormat,
  xScale,
  yScale,
  yScaleForAxis,
 }
}

export default useController

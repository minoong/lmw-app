import * as d3 from 'd3'
import { add, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { exit } from 'process'
import React, { useEffect, useRef, useState } from 'react'
import Candle, { CandleProps } from './Candle'

const today = new Date()

const randomOne = (weight = 1) => {
 return (Math.random() + Math.random() - 1) * weight
}

const generateData = () => {
 const length = Math.round(Math.random() * 90) + 10

 // initial values
 const seedClose = Math.random() * 150 + 50
 let previousClose = seedClose
 const previousVolume = Math.random() * 300 + 10
 let trend = Math.floor(Math.random() * 2) * 2 - 1

 // calculate each bar
 return d3.range(length).map((item, i) => {
  const open = previousClose * (1 + randomOne(0.1))
  const close = open * (1 + randomOne(0.2) * trend)
  const high = Math.max(open, close) * (1 + randomOne(0.1))
  const low = Math.min(open, close) * (1 - randomOne(0.1))
  const volume = previousVolume * (1 + randomOne(0.5))
  console.log(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  previousClose = close
  trend = Math.floor(Math.random() * 2) * 2 - 1
  return {
   time: add(today, { days: i }),
   open,
   high,
   low,
   close,
   volume,
  }
 })
}

const Tutorial = function () {
 const [data, setData] = useState<CandleProps[]>(generateData())
 const ref = useRef(null)

 const dollarHigh = d3.max(data.map((bar) => bar.high))! * 1.05
 const dollarLow = d3.min(data.map((bar) => bar.low))! * 0.95

 const chartDims = {
  pixelWidth: 470,
  pixelHeight: 270,
  dollarHigh,
  dollarLow,
  dollarDelta: dollarHigh - dollarLow,
 }

 const pixelFor = (dollar: any) => {
  return Math.abs(((dollar - chartDims.dollarLow) / chartDims.dollarDelta) * chartDims.pixelHeight - chartDims.pixelHeight)
 }

 const candleWidth = Math.floor((470 / data.length) * 0.7)

 useEffect(() => {
  const test = d3.max(data, (d) => {
   return d.high
  })

  // const yScale = d3.scaleLinear().domain([0, test!]).range([300, 30])

  // d3
  //  .select('#yaxis')
  //  .attr('transform', 'translate(50, 0)') // 살짝 오른쪽으로 밀고
  //  .call(d3.axisLeft(yScale))
  const yScale = d3.scaleLinear().domain([0, test!]).range([300, 0])

  d3
   .select(ref.current)
   //  .call((g) => g.selectAll('g').remove())
   .append('g')
   .call(d3.axisRight(yScale)) // Append it to svg
   .attr('transform', `translate(470,0)`)

  const timeStam = data.map((d) => d.time)

  const xScale = d3
   .scaleTime()
   .domain([timeStam[0], timeStam[timeStam.length - 1]])
   .nice()
   .range([0, 470])
  //  .tickFormat(d3.timeFormat('%d'))
  //  .ticks(d3.timeDay)
  //  .ticks(d3.timeDay)

  d3
   .select(ref.current)
   //  .call((g) => g.selectAll('g').remove())
   .append('g')
   .call(d3.axisBottom(xScale).ticks(7)) // Append it to svg
   .attr('transform', `translate(0,270)`)
 }, [data])

 return (
  <div>
   <button
    type="button"
    onClick={() => {
     d3.select(ref.current).call((g) => g.selectAll('rect,line').remove())
     setData((data) => [...data, generateData()[0]])
    }}
   >
    add Candle
   </button>
   <svg ref={ref} width={500} height={300} className="bg-gray-900 text-white">
    <g id="yaxis" />
    {data.map((bar, i) => {
     const candleX = (470 / (data.length + 1)) * (i + 1)
     // eslint-disable-next-line react/no-array-index-key
     return <Candle key={`candle-${i}`} data={bar} x={candleX} candleWidth={candleWidth} pixelFor={pixelFor} refEl={ref} />
    })}
   </svg>
  </div>
 )
}

export default Tutorial

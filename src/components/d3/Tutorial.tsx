import * as d3 from 'd3'
import { exit } from 'process'
import React, { useEffect, useRef, useState } from 'react'
import Candle, { CandleProps } from './Candle'

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

  previousClose = close
  trend = Math.floor(Math.random() * 2) * 2 - 1

  return {
   time: i,
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
  pixelWidth: 500,
  pixelHeight: 300,
  dollarHigh,
  dollarLow,
  dollarDelta: dollarHigh - dollarLow,
 }

 const pixelFor = (dollar: any) => {
  return Math.abs(((dollar - chartDims.dollarLow) / chartDims.dollarDelta) * chartDims.pixelHeight - chartDims.pixelHeight)
 }

 const candleWidth = Math.floor((500 / data.length) * 0.7)

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
   .append('g')
   .call(d3.axisLeft(yScale)) // Append it to svg
   .attr('transform', `translate(30,0)`)
 }, [])

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
     const candleX = (500 / (data.length + 1)) * (i + 1)
     // eslint-disable-next-line react/no-array-index-key
     return <Candle key={`candle-${i}`} data={bar} x={candleX} candleWidth={candleWidth} pixelFor={pixelFor} refEl={ref} />
    })}
   </svg>
  </div>
 )
}

export default Tutorial

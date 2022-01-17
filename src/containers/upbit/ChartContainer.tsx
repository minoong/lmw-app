import * as d3 from 'd3'
import { add, format } from 'date-fns'
import * as _ from 'lodash'
import { ko } from 'date-fns/locale'
import { exit } from 'process'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { NumberValue } from 'd3'
import { UpbitProps } from '../../@types'
import Candle from '../../components/upbit/Candle'
import MarketContainer from '../Nav/MarketContainer'
import CrossHairs from '../../components/d3/CrossHairs'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ChartContainer = function () {
 const [candles, setCandles] = useState<UpbitProps[]>([])
 const ref = useRef(null)

 const [mouseCoords, setMouseCoords] = useState({
  x: 0,
  y: 0,
 })

 const { data, error } = useSWR<UpbitProps[], any>('https://api.upbit.com/v1/candles/minutes/1?market=KRW-STEEM&count=30', fetcher, {
  refreshInterval: 1000,
 })

 useEffect(() => {
  if (!data) return

  const newData = _.reverse(data)

  d3.select(ref.current).call((g) => g.selectAll('rect,line').remove())
  setCandles(() => [...newData])

  const max = d3.max(data, (d) => {
   return d.high_price
  })
  const min = d3.min(data, (d) => {
   return d.low_price
  })

  const yScale = d3.scaleLinear().domain([min!, max!]).range([300, 0])

  // const focus = d3.select(ref.current).append('g').style('display', 'none')

  d3
   .select(ref.current)
   .call((g) => g.selectAll('g').remove())
   .append('g')
   .call(d3.axisRight(yScale)) // Append it to svg
   .attr('transform', `translate(470,0)`)

  const bisectDate = d3.bisector(function (d: UpbitProps) {
   return new Date(d.candle_date_time_utc)
  }).left
  const xScaleTest = d3
   .scaleTime()
   .domain([new Date(newData[0].candle_date_time_utc), new Date(newData[newData.length - 1].candle_date_time_utc)])
   .range([0, 470])

  d3
   .select(ref.current)
   .append('rect')
   .attr('width', 470)
   .attr('height', 270)
   .style('fill', 'none')
   .style('pointer-events', 'all')
   .on('mousemove', function (event) {
    // const x0 = xScale.invert(d3.pointer(event, this)[0])
    // const i = bisectDate(_.reverse(data), x0, 1)
    // const d0 = _.reverse(data)[i - 1]
    // const d1 = _.reverse(data)[i]

    const coords = d3.pointer(event, this)
    const x0 = xScaleTest.invert(coords[0])
    const i = bisectDate(_.reverse(data), x0, 1)
    const d0 = _.reverse(data)[i - 1]
    const d1 = _.reverse(data)[i]
    const d = +x0 - +d0.candle_date_time_utc > +d1.candle_date_time_utc - +x0 ? d1 : d0

    console.log(d1)

    d3
     .select(ref.current)
     //  .call((g) => g.selectAll('g').remove())
     .append('g')
     .call(d3.axisBottom(xScaleTest).ticks(7)) // Append it to svg
     .attr('transform', `translate(0,270)`)
   })
 }, [data])

 if (!candles || candles.length < 1) {
  return <div>loading...</div>
 }

 const dollarHigh = d3.max(candles.map((bar) => bar.high_price))!
 const dollarLow = d3.min(candles.map((bar) => bar.low_price))!

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

 const candleWidth = Math.floor((470 / candles.length) * 0.7)

 const onMouseLeave = () => {
  setMouseCoords({
   x: 0,
   y: 0,
  })
 }

 const onMouseMoveInside = (e: React.MouseEvent) => {
  setMouseCoords({
   x: e.nativeEvent.x - Math.round(e.currentTarget.getBoundingClientRect().left),
   y: e.nativeEvent.y - Math.round(e.currentTarget.getBoundingClientRect().top),
  })
 }

 return (
  <div>
   {/* <MarketContainer /> */}
   <svg ref={ref} width={500} height={300} className="bg-gray-900 text-white" onMouseMove={onMouseMoveInside} onMouseLeave={onMouseLeave}>
    <g id="yaxis" />
    {candles.map((bar, i, array) => {
     //  const candleX = (470 / (candles.length + 1)) * (i + 1)
     const xScale = d3
      .scaleTime()
      .domain([new Date(array[0].candle_date_time_utc), new Date(array[array.length - 1].candle_date_time_utc)])
      //   .nice()
      .range([0, 470])
     const candleX = xScale(new Date(bar.candle_date_time_utc))
     // eslint-disable-next-line react/no-array-index-key
     return <Candle key={`candle-${i}`} data={bar} x={candleX} candleWidth={candleWidth} pixelFor={pixelFor} refEl={ref} />
    })}
    {candles && (
     <CrossHairs x={mouseCoords.x} y={mouseCoords.y} pixelWidth={chartDims.pixelWidth} pixelHeight={chartDims.pixelHeight} refEl={ref} data={candles} />
    )}
   </svg>
  </div>
 )
}

export default ChartContainer

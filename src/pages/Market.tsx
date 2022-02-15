/* eslint-disable camelcase */
/* eslint-disable radix */
import React, { ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useLocation, useParams } from 'react-router-dom'
import useSWR, { Fetcher } from 'swr'
import * as _ from 'lodash'
import { UpbitProps } from '../@types'
import useDimensions from '../hooks/useDimensions'

// const fetcher: Fetcher<UpbitProps[]> = (url: string) =>
//  fetch(url)
//   .then((r) => r.json())
//   .then((r) => _.reverse(r))

const Market = function () {
 const svgRef = useRef(null)
 const { market } = useParams()
 const [data, setData] = useState<UpbitProps[]>([])

 //  const { data, error } = useSWR('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=30', fetcher, {
 //   //   refreshInterval: 1000,
 //  })

 useEffect(() => {
  console.log('asdjflksdjflksjdkl')
  async function fetchData() {
   const result = await (await fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=30')).json()
   setData(_.map(_.reverse(result), (data) => ({ ...data, candle_date_time_utc: new Date(data.candle_date_time_utc) })))
  }

  fetchData()
 }, [])

 const [containerRef, { height, svgHeight, svgWidth, width }] = useDimensions({
  maxHeight: 400,
  scaleCoef: 0.5,
 })

 //  const xMin = useMemo(() => d3.min(data, ({ trade_price }) => trade_price), [data])
 const xMin = useMemo(() => d3.min(data, ({ candle_date_time_utc }) => candle_date_time_utc), [data])!
 const xMax = useMemo(() => d3.max(data, ({ candle_date_time_utc }) => candle_date_time_utc), [data])!
 const xScale = useMemo(() => d3.scaleTime().domain([xMin, xMax]).range([0, width]), [xMin, xMax, width])

 const xTickFormat = (d: Date) => {
  return d3.timeFormat('%H:%M %p')(d)
 }

 useEffect(() => {
  if (data.length > 0) {
   const xAxis = d3.axisBottom(xScale)
   d3.select(svgRef.current).selectAll('g').remove()
   d3
    .select(svgRef.current)
    .append('g')
    .attr('transform', `translate(10, ${height - height / 6})`)
    .call(xAxis)
  }
 }, [data, height])

 return (
  <div ref={containerRef}>
   <svg ref={svgRef} width={width} height={height}>
    <g transform={`translate(0, ${height - height / 6})`} />
   </svg>
  </div>
 )
}

export default Market

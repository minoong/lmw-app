import React, { useEffect } from 'react'
import * as d3 from 'd3'
import * as classNames from 'classnames'

export interface CandleProps {
 time: Date
 close: number
 open: number
 high: number
 low: number
}

interface IProps {
 data: CandleProps
 x: number
 candleWidth: number
 pixelFor: (value: number) => number
 refEl: React.MutableRefObject<null> | null
}

const Candle: React.FC<IProps> = function ({ data, x, candleWidth, pixelFor, refEl }) {
 const up = data.close > data.open
 const barTop = pixelFor(up ? data.close : data.open)
 const barBottom = pixelFor(up ? data.open : data.close)
 const barHeight = barBottom - barTop
 const wickTop = pixelFor(data.high)
 const wickBottom = pixelFor(data.low)

 useEffect(() => {
  if (!refEl?.current) return

  const doc = d3.select(refEl.current)
  doc
   .data([data])
   .append('rect')
   .attr('width', candleWidth)
   .attr('height', () => barHeight)
   //    .attr('fill', 'orange')
   .attr('x', x - candleWidth / 2)
   .attr('y', barTop)
   //    .style('stroke', '1')
   .attr('class', () => {
    return classNames.default({
     'stroke-1': true,
     'fill-current text-green-500': up,
     'fill-current text-red-500': !up,
    })
   })

  const doc2 = d3.select(refEl.current)

  doc2
   .data([data])
   .append('line')
   .attr('x1', x)
   .attr('x2', x)
   .attr('y1', barTop)
   .attr('y2', wickTop)
   .attr('class', () => {
    return classNames.default({
     'stroke-1': true,
     'stroke-current text-green-500': up,
     'stroke-current text-red-500': !up,
    })
   })

  const doc3 = d3.select(refEl.current)

  doc3
   .data([data])
   .append('line')
   .attr('x1', x)
   .attr('x2', x)
   .attr('y1', barBottom)
   .attr('y2', wickBottom)
   .attr('class', () => {
    return classNames.default({
     'stroke-1': true,
     'stroke-current text-green-500': up,
     'stroke-current text-red-500': !up,
    })
   })
 })

 return (
  <>
   {/* <rect
    x={x - candleWidth / 2}
    y={barTop}
    width={candleWidth}
    height={barHeight}
    className={classNames.default({
     'stroke-1': true,
     'fill-current text-green-500': up,
     'fill-current text-red-500': !up,
    })}
   /> */}
   {/* <line
    className={classNames.default({
     'stroke-1': true,
     top: true,
     'stroke-current text-green-500': up,
     'stroke-current text-red-500': !up,
    })}
    x1={x}
    y1={barTop}
    x2={x}
    y2={wickTop}
   />
   <line
    className={classNames.default({
     'stroke-1': true,
     bottom: true,
     'stroke-current text-green-500': up,
     'stroke-current text-red-500': !up,
    })}
    x1={x}
    y1={barBottom}
    x2={x}
    y2={wickBottom}
   /> */}
  </>
 )
}

export default Candle

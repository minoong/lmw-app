import React, { useEffect } from 'react'
import * as d3 from 'd3'
import * as classNames from 'classnames'
import { UpbitProps } from '../../@types'

interface IProps {
 data: UpbitProps
 x: number
 candleWidth: number
 pixelFor: (value: number) => number
 refEl: React.MutableRefObject<null> | null
}

const Candle: React.FC<IProps> = function ({ data, x, candleWidth, pixelFor, refEl }) {
 const up = data.trade_price > data.opening_price
 const barTop = pixelFor(up ? data.trade_price : data.opening_price)
 const barBottom = pixelFor(up ? data.opening_price : data.trade_price)
 const barHeight = barBottom - barTop
 const wickTop = pixelFor(data.high_price)
 const wickBottom = pixelFor(data.low_price)
 const isSame = data.trade_price === data.opening_price
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
     'stroke-current text-green-500': up && !isSame,
     'stroke-current text-red-500': !up && !isSame,
     'stroke-current text-gray-600': isSame,
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
     'stroke-current text-green-500': up && !isSame,
     'stroke-current text-red-500': !up && !isSame,
     'stroke-current text-gray-600': isSame,
    })
   })

  if (isSame) {
   const doc4 = d3.select(refEl.current)

   doc4
    .data([data])
    .append('line')
    .attr('x1', x - candleWidth / 2)
    .attr('x2', x + candleWidth / 2)
    .attr('y1', barTop)
    .attr('y2', barTop)
    .attr('class', () => {
     return classNames.default({
      'stroke-1': true,
      'stroke-current text-gray-600': isSame,
     })
    })
  }
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
       'stroke-current text-gray-600': !up,
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

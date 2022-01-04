import React, { useEffect } from 'react'
import * as classNames from 'classnames'
import * as d3 from 'd3'

interface IProps {
 x: number
 y: number
 pixelWidth: number
 pixelHeight: number
 refEl: React.MutableRefObject<null> | null
}

const CrossHairs: React.FC<IProps> = function ({ x, y, pixelWidth, pixelHeight, refEl }) {
 useEffect(() => {
  if (!refEl?.current) return
  d3
   .select(refEl.current)
   .call((g) => g.selectAll('.custom-x').remove())
   .append('line')
   .attr('x1', 0)
   .attr('y1', y)
   .attr('x2', pixelWidth)
   .attr('y2', y)
   .attr('class', () => {
    return classNames.default({
     'custom-x': true,
     'stroke-1': true,
     'stroke-current text-gray-600': true,
    })
   })

  d3
   .select(refEl.current)
   .call((g) => g.selectAll('.custom-y').remove())
   .append('line')
   .attr('x1', x)
   .attr('y1', 0)
   .attr('x2', x)
   .attr('y2', pixelHeight)
   .attr('class', () => {
    return classNames.default({
     'custom-y': true,
     'stroke-1': true,
     'stroke-current text-gray-600': true,
    })
   })
 })

 return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
   {/* <line
    x1={0}
    y1={y}
    x2={pixelWidth}
    y2={y}
    className={classNames.default({
     'stroke-1': true,
     'stroke-current text-gray-600': true,
    })}
   />
   <line
    x1={x}
    y1={0}
    x2={x}
    y2={pixelHeight}
    className={classNames.default({
     'stroke-1': true,
     'stroke-current text-gray-600': true,
    })}
   /> */}
  </>
 )
}

export default CrossHairs

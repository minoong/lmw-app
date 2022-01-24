import React, { useCallback, useRef } from 'react'
import * as d3 from 'd3'
import { IItem } from '../../views/MultilineChart'

interface IProps {
 xScale: d3.ScaleTime<number, number, never>
 yScale: d3.ScaleLinear<number, number, never>
 width: number
 height: number
 data: IItem[]
 margin: {
  top: number
 }
 anchorEl: SVGRectElement
 children: React.ReactNode
}

const Tooltip: React.FC<IProps> = function ({ xScale, yScale, width, height, data, margin, anchorEl, children }) {
 const ref = useRef<SVGGElement>(null)
 const drawLine = useCallback(
  (x: number) => {
   d3.select(ref.current).select('.tooltipLine').attr('x1', x).attr('x2', x).attr('y1', -margin.top).attr('y2', height)
  },
  [ref, height, margin],
 )

 return <g ref={ref} />
}

export default Tooltip

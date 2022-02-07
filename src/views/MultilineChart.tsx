import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import useController from './MultilineChart.controller'
import GridLine from '../components/common/GridLine'
import Line from '../components/common/Line'
import Axis from '../components/common/Axis'
import Area from '../components/common/Area'
import Overlay from '../components/common/Overlay'
import Tooltip from '../components/common/Tooltip'

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
 const overlayRef = useRef<SVGRectElement>(null)
 const { width, height, margin } = dimensions
 const svgWidth = width + margin.left + margin.right
 const svgHeight = height + margin.top + margin.bottom
 const controller = useController({ data, width, height })
 const { yTickFormat, xScale, yScale, yScaleForAxis, xTickFormat } = controller

 return (
  <svg width={svgWidth} height={svgHeight}>
   <g transform={`translate(${margin.left},${margin.top})`}>
    <GridLine type="vertical" scale={xScale} ticks={5} size={height} transform={`translate(0, ${height})`} disableAnimation />
    <GridLine type="horizontal" scale={yScaleForAxis} ticks={2} size={width} />
    <GridLine type="horizontal" className="baseGridLine" scale={yScale} ticks={1} size={width} disableAnimation />
    {data.map(({ name, items = [], color }) => (
     <Line key={name} data={items} xScale={xScale} yScale={yScale} color={color} isSmooth animation="fadeIn" />
    ))}
    <Area data={data[0].items} color={data[0].color} xScale={xScale} yScale={yScale} disableAnimation />
    <Axis type="left" scale={yScaleForAxis} transform="translate(50, -10)" ticks={5} tickFormat={yTickFormat} className="zzzz" />
    {/* <Axis type="bottom" className="axisX" scale={xScale} transform={`translate(10, ${height - height / 6})`} ticks={5} /> */}
    <Overlay ref={overlayRef} width={width} height={height}>
     <Axis
      type="bottom"
      className="axisX"
      anchorEl={overlayRef!.current!}
      scale={xScale}
      transform={`translate(10, ${height - height / 6})`}
      ticks={5}
      tickFormat={xTickFormat}
     />
     <Tooltip anchorEl={overlayRef.current} width={width} height={height} margin={margin} xScale={xScale} yScale={yScale} data={data} />
    </Overlay>
   </g>
  </svg>
 )
}

export default MultilineChart

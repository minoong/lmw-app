import React, { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { IItem, IPortfolio, ISchc, IVcit } from '../../views/MultilineChart'
import { formatPriceKRW } from '../../utils/charts/common.charts'

interface IProps {
 xScale: d3.ScaleTime<number, number, never>
 yScale: d3.ScaleLinear<number, number, never>
 width: number
 height: number
 data: (IPortfolio | ISchc | IVcit)[]
 margin: {
  top: number
 }
 anchorEl: SVGRectElement | null
}

const Tooltip: React.FC<IProps> = function ({ xScale, yScale, width, height, data, margin, anchorEl, ...props }) {
 const ref = useRef<SVGGElement>(null)
 const drawLine = useCallback(
  (x: number) => {
   d3.select(ref.current).select('.tooltipLine').attr('x1', x).attr('x2', x).attr('y1', -margin.top).attr('y2', height)
  },
  [ref, height, margin],
 )
 const drawContent = useCallback(
  (x) => {
   const tooltipContent = d3.select(ref.current).select('.tooltipContent')
   tooltipContent.attr('transform', (cur, i, nodes) => {
    const nodeWidth = (nodes[i] as HTMLElement).getBoundingClientRect().width || 0
    const translateX = nodeWidth + x > width ? x - nodeWidth - 12 : x + 8
    return `translate(${translateX}, ${-margin.top})`
   })
   tooltipContent.select('.contentTitle').text(d3.timeFormat('%b %d, %Y')(xScale.invert(x)))
  },
  [xScale, margin, width],
 )
 const drawBackground = useCallback(() => {
  const contentBackground = d3.select(ref.current).select('.contentBackground')
  contentBackground.attr('width', 125).attr('height', 40)

  const tooltipContentElement = d3.select(ref.current).select('.tooltipContent').node()

  if (!tooltipContentElement) return

  const contentSize = (tooltipContentElement as HTMLElement).getBoundingClientRect()
  contentBackground.attr('width', contentSize.width + 8).attr('height', contentSize.height + 4)
 }, [])

 const onChangePosition = useCallback((d: IItem, i: number, isVisible: boolean) => {
  d3
   .selectAll('.performanceItemValue')
   .filter((td, tIndex) => tIndex === i)
   .text(d.marketvalue && !isVisible ? 'No data' : formatPriceKRW(d.marketvalue))

  const maxNameWidth = d3.max(d3.selectAll('.performanceItemName').nodes() as HTMLElement[], (node: HTMLElement) => node.getBoundingClientRect().width)

  d3.selectAll('.performanceItemValue').attr('transform', (datum, index, nodes) => {
   const dom = nodes[index]! as HTMLElement

   return `translate(${(dom.previousSibling! as HTMLElement).getBoundingClientRect().width + 14},4)`
  })

  d3.selectAll('.performanceItemMarketValue').attr('transform', `translate(${maxNameWidth! + 60},4)`)
 }, [])

 const followPoints = useCallback(
  (event) => {
   const [x] = d3.pointer(event, anchorEl)
   console.log(d3.pointer(event, anchorEl))
   const xDate = xScale.invert(x)
   const bisectDate = d3.bisector((d: IItem) => d.date).left
   let baseXPos = 0

   d3
    .select(ref.current)
    .selectAll('.tooltipLinePoint')
    .attr('transform', (cur, i) => {
     const index = bisectDate(data[i].items, xDate, 1)
     const d0 = data[i].items[index - 1]
     const d1 = data[i].items[index]

     const d = +xDate - +d0.date > +d1.date - +xDate ? d1 : d0

     if (d.date === undefined && d.value === undefined) {
      return 'translate(-100,-100)'
     }

     const xPos = xScale(d.date)

     if (i === 0) {
      baseXPos = xPos
     }

     let isVisible = true

     if (xPos !== baseXPos) {
      isVisible = false
     }

     const yPos = yScale(d.value)

     onChangePosition(d, i, isVisible)

     return isVisible ? `translate(${xPos}, ${yPos})` : 'translate(-100,-100)'
    })

   drawLine(baseXPos)
   drawContent(baseXPos)
   drawBackground()
  },
  [anchorEl, drawLine, drawContent, drawBackground, xScale, yScale, data, onChangePosition],
 )

 useEffect(() => {
  d3
   .select(anchorEl)
   .on('mouseout.tooltip', () => {
    d3.select(ref.current).attr('opacity', 0)
   })
   .on('mouseover.tooltip', () => {
    d3.select(ref.current).attr('opacity', 1)
   })
   .on('mousemove.tooltip', (event) => {
    d3.select(ref.current).selectAll('.tooltipLinePoint').attr('opacity', 1)
    followPoints(event)
   })
 }, [anchorEl, followPoints])

 if (!data.length) return null

 return (
  <g ref={ref} opacity={0} className="tooltip">
   <line className="tooltipLine" />
   <g className="tooltipContent">
    <rect className="contentBackground" rx={4} ry={4} opacity={0.2} />
    <text className="contentTitle" transform="translate(4,14)" />
    <g className="content" transform="translate(4,32)">
     {data.map(({ name, color }, i) => (
      <g key={name} transform={`translate(6,${22 * i})`}>
       <circle r={6} fill={color} />
       <text className="performanceItemName" transform="translate(10,4)">
        {name}
       </text>
       <text className="performanceItemValue" opacity={0.5} fontSize={10} />
       <text className="performanceItemMarketValue" />
      </g>
     ))}
    </g>
   </g>
   {data.map(({ name }) => (
    <circle className="tooltipLinePoint" r={6} key={name} opacity={0} />
   ))}
  </g>
 )
}

export default Tooltip

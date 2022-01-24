import React from 'react'

interface IProps {
 width: number
 height: number
 children: React.ReactNode
}

// eslint-disable-next-line react/display-name
const Overlay = React.forwardRef<SVGRectElement, IProps>(({ width, height, children }, ref) => (
 <g>
  {children}
  <rect ref={ref} width={width} height={height} opacity={0} />
 </g>
))

export default Overlay

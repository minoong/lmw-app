import { useRef } from 'react'
import { UseDimensionsParamsProps, UseDimensionsProps } from '../@types'
import useResize from './useResize'

const useDimensions = ({ maxHeight, scaleCoef, margin }: UseDimensionsParamsProps) => {
 const ref = useRef(null)
 const { width } = useResize(ref)

 const height = !maxHeight || width * scaleCoef < maxHeight ? width * scaleCoef : maxHeight
 const innerWidth = width - (margin?.left || 0) - (margin?.right || 0)
 const innerHeight = height - (margin?.top || 0) - (margin?.bottom || 0)
 const result: UseDimensionsProps = {
  svgWidth: width,
  svgHeight: height,
  width: innerWidth,
  height: innerHeight,
 }
 return [ref, result]
}

export default useDimensions

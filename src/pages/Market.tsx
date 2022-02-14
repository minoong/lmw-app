import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useSWR, { Fetcher } from 'swr'
import * as _ from 'lodash'
import { UpbitProps } from '../@types'
import useDimensions from '../hooks/useDimensions'

const fetcher: Fetcher<UpbitProps[]> = (url: string) =>
 fetch(url)
  .then((r) => r.json())
  .then((r) => _.reverse(r))

const Market = function () {
 const { market } = useParams()

 const { data, error } = useSWR('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=30', fetcher, {
  //   refreshInterval: 1000,
 })

 const [containerRef] = useDimensions({
  maxHeight: 400,
  scaleCoef: 0.5,
 })

 useEffect(() => {
  console.log(data)
 }, [data])

 return <div ref={containerRef as unknown as React.MutableRefObject<null>}>{market}</div>
}

export default Market

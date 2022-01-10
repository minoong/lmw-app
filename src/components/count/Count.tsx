import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const Count = function () {
 const [count, setCount] = useState<number>(0)

 const { data: xrpInfo, error } = useSWR<any[], any>('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=4', fetcher, {
  refreshInterval: 1000,
 })

 console.log(xrpInfo, error)

 return (
  <>
   <button type="button" onClick={() => setCount((count) => count + 1)}>
    +
   </button>
   <h1>{count}</h1>
   <div>
    <table>
     <thead>
      <tr style={{ backgroundColor: 'black', color: 'white' }}>
       <th scope="col" style={{ textAlign: 'center' }}>
        market
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        candle_date_time_kst
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        opening_price
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        high_price
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        low_price
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        trade_price
       </th>
       <th scope="col" style={{ textAlign: 'center' }}>
        candle_acc_trade_price
       </th>
      </tr>
     </thead>

     {xrpInfo !== undefined && xrpInfo.length > 0 && (
      <tbody>
       {xrpInfo.map((infor: any, idx: number) => {
        return (
         // eslint-disable-next-line react/no-array-index-key
         <tr key={idx} style={{ backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
          <td>{infor.market}</td>
          <td>{infor.candle_date_time_kst}</td>
          <td>{infor.opening_price}</td>
          <td>{infor.high_price}</td>
          <td>{infor.low_price}</td>
          <td>{infor.trade_price}</td>
          <td>{infor.candle_acc_trade_price}</td>
         </tr>
        )
       })}
      </tbody>
     )}
    </table>
   </div>
   <Outlet />
  </>
 )
}

export default Count

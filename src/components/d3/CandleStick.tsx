import React, { useEffect, useState } from 'react'
import CSVReader from 'react-csv-reader'
import * as _ from 'lodash'

type CandleProps = [string, number, number, number, number, number, number]

interface CandleListProps {
 candle: CandleProps[]
}

const CandleStick = function () {
 const [data, setData] = useState<CandleProps[]>([])

 useEffect(() => {
  console.log('data', data)
 }, [data])

 return (
  <div>
   <CSVReader
    onFileLoaded={(data: CandleProps[], fileInfo, originalFile) =>
     setData(
      _.map(data, (row) => {
       const [Date, Open, High, Low, Close, AdjClose, Volume] = row
       return [Date, +Open, +High, +Low, +Close, +AdjClose, +Volume]
      }),
     )
    }
   />
  </div>
 )
}

export default CandleStick

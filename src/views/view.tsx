import React, { useState } from 'react'
import portfolio from '../static/portfolio.json'
import schc from '../static/SCHC.json'
import vcit from '../static/VCIT.json'
import Legend from './legend/Legend'
import MultilineChart, { IPortfolio, ISchc, IVcit } from './MultilineChart'

const portfolioData: IPortfolio = {
 name: 'Portfolio',
 color: '#ffffff',
 items: portfolio.map((d) => ({ ...d, date: new Date(d.date) })),
}

const schcData: ISchc = {
 name: 'SCHC',
 color: '#d53e4f',
 items: schc.map((d) => ({ ...d, date: new Date(d.date) })),
}

const vcitData: IVcit = {
 name: 'VCIT',
 color: '#5e4fa2',
 items: vcit.map((d) => ({ ...d, date: new Date(d.date) })),
}

const dimensions = {
 width: 600,
 height: 300,
 margin: {
  top: 30,
  right: 30,
  bottom: 30,
  left: 60,
 },
}

const view = () => {
 const [selectedItems, setSelectedItems] = useState<string[]>([])
 const legendData = [portfolioData, schcData, vcitData]
 const chartData = [portfolioData, ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name))]

 const onChangeSelection = (name: string) => {
  const newSelectedItems = selectedItems.includes(name) ? selectedItems.filter((item) => item !== name) : [...selectedItems, name]
  setSelectedItems(newSelectedItems)
 }
 return (
  <div className="bg-gray-900">
   <Legend data={legendData} selectedItems={selectedItems} onChangeSelection={onChangeSelection} />
   <MultilineChart data={chartData} dimensions={dimensions} />
  </div>
 )
}

export default view

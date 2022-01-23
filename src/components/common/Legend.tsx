/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { IPortfolio, ISchc, IVcit } from '../../views/MultilineChart'

interface IProps {
 data: (IPortfolio | ISchc | IVcit)[]
 selectedItems: string[]
 onChangeSelection: (name: string) => void
}

const Legend: React.FC<IProps> = function ({ data, selectedItems, onChangeSelection }) {
 return (
  <div className="legendContainer">
   {data.map((d) => (
    <div className="checkbox" style={{ color: d.color }} key={d.name}>
     {d.name !== 'Portfolio' && <input type="checkbox" value={d.name} checked={selectedItems.includes(d.name)} onChange={() => onChangeSelection(d.name)} />}
     <label>{d.name}</label>
    </div>
   ))}
  </div>
 )
}

export default Legend

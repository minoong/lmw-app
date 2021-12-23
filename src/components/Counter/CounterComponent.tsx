import React from 'react'
import { decrement, HooksCounter, increment } from '../../store/counter/counterSlice'

const CounterComponent: React.FC = function () {
 const { count, dispatch } = HooksCounter()

 return (
  <div>
   <button type="button" aria-label="Increment value" onClick={() => dispatch(increment())}>
    Increment
   </button>
   <span>{count}</span>
   <button type="button" aria-label="Decrement value" onClick={() => dispatch(decrement())}>
    Decrement
   </button>
  </div>
 )
}

export default CounterComponent

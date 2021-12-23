import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'
import { useAppDispatch, useAppSelector } from '../store'

interface CounterState {
 value: number
}

// Define the initial state using that type
const initialState: CounterState = {
 value: 0,
}

export const counterSlice = createSlice({
 name: 'counter',
 initialState,
 reducers: {
  increment: (state) => {
   state.value += 1
  },
  decrement: (state) => {
   state.value -= 1
  },
  incrementByAmount: (state, action: PayloadAction<number>) => {
   state.value += action.payload
  },
 },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export function HooksCounter() {
 const count = useAppSelector((state: RootState) => state.counter.value)
 const dispatch = useAppDispatch()

 return {
  count,
  dispatch,
 }
}

export default counterSlice.reducer

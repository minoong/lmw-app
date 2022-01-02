import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'
import { loading } from '../../../@types'
import { RootState } from '../../rootReducer'

export interface Market {
 market: string
 korean_name: string
 english_name: string
}

interface MarketState {
 data: Market[]
 loading: loading
 error: SerializedError | null
 currentRequestId: string | undefined
}

const initialState: MarketState = {
 data: [],
 loading: 'idle',
 error: null,
 currentRequestId: undefined,
}

export const fetchMarket = createAsyncThunk<Market[], void, { state: RootState }>('upbit/fetchMarket', async (params, { requestId, getState }) => {
 const { currentRequestId, loading } = getState().market

 if (loading !== 'pending' || requestId !== currentRequestId) {
  return []
 }

 const response = await axios.get<Market[]>(`https://api.upbit.com/v1/market/all`)
 return response.data
})

export const marketSlice = createSlice({
 name: 'market',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder.addCase(fetchMarket.pending, (state, action) => {
   if (state.loading === 'idle') {
    state.loading = 'pending'
    state.currentRequestId = action.meta.requestId
   }
  })
  builder.addCase(fetchMarket.fulfilled, (state, action) => {
   const { requestId } = action.meta
   if (state.loading === 'pending' && state.currentRequestId === requestId) {
    state.loading = 'idle'
    state.data = [...state.data, ...action.payload]
    state.currentRequestId = undefined
   }
  })
  builder.addCase(fetchMarket.rejected, (state, action) => {
   const { requestId } = action.meta
   if (state.loading === 'pending' && state.currentRequestId === requestId) {
    state.loading = 'idle'
    state.error = action.error
    state.currentRequestId = undefined
   }
  })
 },
})

import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { loading } from '../../../@types'
import { RootState } from '../../rootReducer'

export interface Post {
 userId: number
 id: number
 title: string
 body: string
}

export interface Pagination {
 start: number
 limit: number
}

export interface PostsState {
 data: Post[]
 pagination: Pagination
 loading: loading
 error: SerializedError | null
 currentRequestId: string | undefined
}

const initialState: PostsState = {
 data: [],
 pagination: {
  start: 0,
  limit: 5,
 },
 loading: 'idle',
 error: null,
 currentRequestId: undefined,
}

export const getPostsList = createAsyncThunk<Post[], Partial<Post & Pagination>, { state: RootState }>(
 'users/fetchByIdStatus',
 async (params, { requestId, getState }) => {
  const { start = 0, limit = 5 } = params
  const { currentRequestId, loading } = getState().comments

  if (loading !== 'pending' || requestId !== currentRequestId) {
   return []
  }

  const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/po123sts?_start=${start}&_limit=${limit}`)
  return response.data
 },
)

export const postsSlice = createSlice({
 name: 'posts',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder.addCase(getPostsList.pending, (state, action) => {
   if (state.loading === 'idle') {
    state.loading = 'pending'
    state.currentRequestId = action.meta.requestId
   }
  })
  builder.addCase(getPostsList.fulfilled, (state, action) => {
   const { requestId } = action.meta
   if (state.loading === 'pending' && state.currentRequestId === requestId) {
    state.loading = 'idle'
    state.data = [...state.data, ...action.payload]
    state.currentRequestId = undefined
   }
  })
  builder.addCase(getPostsList.rejected, (state, action) => {
   const { requestId } = action.meta
   if (state.loading === 'pending' && state.currentRequestId === requestId) {
    state.loading = 'idle'
    state.error = action.error
    state.currentRequestId = undefined
   }
  })
 },
})

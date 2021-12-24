import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export interface Comment {
 postId: number
 id: number
 name: string
 email: string
 body: string
}

export interface CommentsState {
 data?: Comment[]
 loading: boolean
 error: AxiosError | null
}

const initialState: CommentsState = {
 data: [],
 loading: false,
 error: null,
}

export const commentsSlice = createSlice({
 name: 'comments',
 initialState,
 reducers: {
  getCommentsRequest: (state) => {
   state.loading = true
   state.error = null
  },
  getCommentsSuccess: (state, action: PayloadAction<CommentsState>) => {
   state.data = action.payload.data
   state.loading = action.payload.loading
   state.error = action.payload.error
  },
 },
})

const { actions } = commentsSlice
export const { getCommentsRequest, getCommentsSuccess } = actions

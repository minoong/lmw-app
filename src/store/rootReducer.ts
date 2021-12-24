import { combineReducers } from '@reduxjs/toolkit'
import { commentsSlice } from './modules/comments/CommentsSlice'

const rootReducer = combineReducers({
 comments: commentsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

import { combineReducers } from '@reduxjs/toolkit'
import { postsSlice } from './modules/posts/PostsSlice'

const rootReducer = combineReducers({
 comments: postsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

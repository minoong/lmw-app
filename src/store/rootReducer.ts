import { combineReducers } from '@reduxjs/toolkit'
import { marketSlice } from './modules/market/MarketSlice'
import { postsSlice } from './modules/posts/PostsSlice'

const rootReducer = combineReducers({
 comments: postsSlice.reducer,
 market: marketSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

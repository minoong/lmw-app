import { configureStore, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import rootReducer, { RootState } from './rootReducer'
import { watchComments } from '../saga/comments'
import { commentsSlice } from './modules/comments/CommentsSlice'

const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
 yield all([fork(watchComments)])
}

const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().concat(logger), sagaMiddleware],
 devTools: true,
})

sagaMiddleware.run(rootSaga)

export type ReducerList = typeof commentsSlice.actions

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store

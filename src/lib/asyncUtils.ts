/* eslint-disable @typescript-eslint/ban-types */
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { Comment } from '../store/modules/comments/CommentsSlice'
import { AppThunk, ReducerList } from '../store/store'

type ApiCall<T extends any[], R> = (...args: T) => Promise<R>

export const createActionString = (type: string) => ({
 success: `${type}Success`,
 error: `${type}Error`,
})

export const fetchEntity = <T extends ReducerList, Param extends any[], Res>(entity: T, api: ApiCall<Param, Res>) => {
 return function* (...p: Param) {
  try {
   const data: any[] = yield call(api, ...p)

   console.log('datadatadatadata', data)

   yield put(
    entity.getCommentsSuccess({
     data,
     loading: false,
     error: null,
    }),
   )
  } catch (err) {
   console.log(err)
  }
 }
}

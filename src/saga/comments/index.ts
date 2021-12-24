import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { createActionString, fetchEntity } from '../../lib/asyncUtils'
import { Comment, commentsSlice, CommentsState, getCommentsRequest, getCommentsSuccess } from '../../store/modules/comments/CommentsSlice'

const getComments = async () => (await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')).data

// function* comments(action: PayloadAction<CommentsState>) {
//  try {
//   const result: Comment[] = yield call(getComments)
//   console.log('result', result)
//   yield put(
//    getCommentsSuccess({
//     data: result,
//     loading: false,
//     error: null,
//    }),
//   )
//  } catch (err) {
//   console.log(err)
//  }
// }

export function* watchComments() {
 yield takeLatest(getCommentsRequest.type, fetchEntity(commentsSlice.actions, getComments))
}

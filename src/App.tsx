import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCommentsRequest } from './store/modules/comments/CommentsSlice'
import { useAppDispatch } from './store/store'

const App: React.FC = function () {
 const dispatch = useAppDispatch()
 useEffect(() => {
  dispatch(getCommentsRequest())
 }, [])

 return <div>hi</div>
}

export default App

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPostsList } from './store/modules/posts/PostsSlice'
import { useAppDispatch, useAppSelector } from './store/store'

const App: React.FC = function () {
 const [page, setPage] = useState<number>(0)
 const { data, pagination, error, loading } = useAppSelector((state) => state.comments)
 const dispatch = useAppDispatch()
 useEffect(() => {
  dispatch(getPostsList({ start: page }))
 }, [page])

 return (
  <div>
   hi{' '}
   <button type="button" onClick={() => setPage((page) => page + 5)}>
    more
   </button>
   {loading === 'pending' && (
    <div className="w-60 h-24 border-2 rounded-md mx-auto">
     <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="w-12 bg-gray-300 h-12 rounded-full " />
      <div className="flex flex-col space-y-3">
       <div className="flex flex-row justify-between">
        <div className="w-10 bg-gray-300 h-6 rounded-md " />
        <div className="w-24 bg-gray-300 h-6 rounded-md " />
       </div>
       <div className="w-36 bg-gray-300 h-6 rounded-md " />
      </div>
     </div>
    </div>
   )}
   {data && data.map((post) => <div key={post.id}>{post.title}</div>)}
  </div>
 )
}

export default App

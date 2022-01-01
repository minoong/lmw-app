import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useMatch, useParams } from 'react-router-dom'
import Posts from '../../components/posts/Posts'
import { getPostsList, postsInitialState } from '../../store/modules/posts/PostsSlice'
import { useAppSelector } from '../../store/store'

const PostsContainer: React.FC = function () {
 const location = useLocation()
 const params = useParams()
 const match = useMatch('about')

 console.log(location, params)
 console.log(match)

 //  const ref = useRef<HTMLDivElement>(null)
 const [target, setTarget] = useState<HTMLDivElement | null>(null)
 const dispatch = useDispatch()
 const { data, pagination, error, loading } = useAppSelector((state) => state.comments)

 //  useEffect(() => {
 //   dispatch(getPostsList({ start: 0 }))
 //  }, [])

 const onIntersect: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
   if (entry.isIntersecting && loading === 'idle') {
    observer.unobserve(entry.target)
    // changeExtraTransaction()
    dispatch(getPostsList({ start: pagination.start }))
   }
  })
 }

 useEffect(() => {
  console.log(1)

  return () => {
   //    dispatch(postsInitialState())
   console.log('123j1lk23j12lk3j12lk')
  }
 }, [])

 useEffect(() => {
  let observer: IntersectionObserver
  if (target) {
   observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
   observer.observe(target)
  }
  return () => {
   console.log('end')
   return observer && observer.disconnect()
  }
 }, [data, target])

 return (
  <>
   <Posts data={data} loading={loading} />
   <div ref={setTarget} className="Target-Element">
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
   </div>
  </>
 )
}

export default PostsContainer

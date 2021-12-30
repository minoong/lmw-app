import React from 'react'
import { PostsState } from '../../store/modules/posts/PostsSlice'
import Post from './Post'

type IProps = Pick<PostsState, 'data' | 'loading'>

const Posts: React.FC<IProps> = function ({ data, loading }) {
 return (
  <>
   <div>hi</div>
   {data && data.map((post) => <Post key={post.id} post={{ ...post }} />)}
  </>
 )
}

export default Posts

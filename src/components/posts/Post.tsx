import React from 'react'
import { Post as PostType } from '../../store/modules/posts/PostsSlice'

interface IProps {
 post: PostType
}

const Post: React.FC<IProps> = function ({ post }) {
 return (
  <div className="w-96 h-24 border-2 rounded-md mx-auto">
   <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
    <div className="w-12 bg-gray-300 h-12 rounded-full " />
    <div className="flex flex-col space-y-3">
     <div className="flex flex-row justify-between">
      <div className="w-10  h-6 rounded-md " />
      <div className="w-24  h-6 rounded-md " />
     </div>
     <div className="w-auto bg-gray-300 h-6 rounded-md ">{post.title}</div>
    </div>
   </div>
  </div>
 )
}

export default Post

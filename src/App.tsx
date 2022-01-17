import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Count from './components/count/Count'
import NavConatiner from './containers/Nav/NavConatiner'
import { getPostsList } from './store/modules/posts/PostsSlice'
import { useAppDispatch, useAppSelector } from './store/store'

const PostsContainer = React.lazy(() => import('./containers/posts/PostsContainer'))
const Tutorial = React.lazy(() => import('./components/d3/Tutorial'))
const CandleStick = React.lazy(() => import('./components/d3/CandleStick'))
const ChartContainer = React.lazy(() => import('./containers/upbit/ChartContainer'))
const View = React.lazy(() => import('./views/view'))

const App: React.FC = function () {
 return (
  <>
   <div>App</div>
   <NavConatiner />
   <Routes>
    <Route
     path="/about"
     element={
      <Suspense fallback={<div>loading</div>}>
       <PostsContainer />
      </Suspense>
     }
    />
    <Route path="/count" element={<Count />} />
    <Route
     path="/d3"
     element={
      <Suspense fallback={<div>loading</div>}>
       <Tutorial />
      </Suspense>
     }
    />
    <Route
     path="/upbit"
     element={
      <Suspense fallback={<div>loading</div>}>
       <ChartContainer />
      </Suspense>
     }
    />
    <Route
     path="/learn"
     element={
      <Suspense fallback={<div>loading</div>}>
       <View />
      </Suspense>
     }
    />
   </Routes>
  </>
 )
}

export default App

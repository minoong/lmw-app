import React, { useState } from 'react'

const Count = function () {
 const [count, setCount] = useState<number>(0)
 return (
  <>
   <button type="button" onClick={() => setCount((count) => count + 1)}>
    +
   </button>
   <h1>{count}</h1>
  </>
 )
}

export default Count

import { useState } from "react";
import About from '../pages/About';

export default function Parent(){

  const [count, setCount] = useState(0);

  const handleMessage = (msg) => {
    setCount(prev => prev + msg)
  }

  return (
     <div>
      <h1>{count}</h1>
      <Child sendMessage={handleMessage} />
      <About sendCount={count} />
    </div>
  )
}

function Child({sendMessage}){
  return( 
    <button onClick={() => sendMessage(1) }>
      Send Message
    </button>
  )
}
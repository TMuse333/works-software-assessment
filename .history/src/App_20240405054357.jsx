import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/note/note'
i\
import List from './components/list/list'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
<div className='homepage-container'>


<h1 style={{
  color:'white'
}}>Task Manager</h1>   
  <List/>
  </div>
  

    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/note/note'
import Navbar from './components/navbar/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-red'>
      
    </div>
    <Navbar/>
  {/* <Note/> */}
    </>
  )
}

export default App

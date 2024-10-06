import { useState } from 'react'
import './App.css'
import SearchCard from './SearchComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchCard />
    </>
  )
}

export default App

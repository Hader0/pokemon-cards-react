import { useState } from 'react'
import './App.css'
import SearchCard from './components/SearchComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchCard />
      <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons" className='reference'>Pokemon Icon Created by Roundicons Freebies - Flaticon</a>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import SearchCard from './components/SearchComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchCard />
      <p className='reference'>Created by Hayden Bradford - Copyright © 2024 | <a href="https://www.flaticon.com/free-icons/pokemon">Pokemon Icon Created by Roundicons Freebies - Flaticon</a></p>
    </>
  )
}

export default App

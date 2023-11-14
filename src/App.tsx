// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import HomeTemplate from './HomeTemplate'
import LogIn from './LogIn'
import ProductPreview from './ProductPreview'
import Home from './Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate/>}>
            <Route path='login' element={<LogIn/>}></Route>
            <Route path='/'></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

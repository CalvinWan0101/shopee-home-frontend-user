// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import PageTemplate from './HomeTemplate'
import LogIn from './LogIn'
import ProductPreview from './ProductPreview'
import Home from './Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PageTemplate/>}>
            <Route path='login' element={<LogIn/>}></Route>
            <Route path='/' element={<Home/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

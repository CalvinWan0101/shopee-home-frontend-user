import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import PageTemplate from './PageTemplate'
import LogIn from './LogIn'
import Home from './Home'
import Product from './Product'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PageTemplate/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/Product/:id' element={<Product/>}></Route>
            <Route path='/login' element={<LogIn/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

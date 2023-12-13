import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import PageTemplate from './PageTemplate'
import LogIn from './LogIn'
import Home from './Home'
import Product from './Product'
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { MaterialTailwindTheme, ThemeProvider as ThemeProviderTailwind} from "@material-tailwind/react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const MyTheme = createTheme({
  palette: {
    background: {
      default: '#fef9eb',
    },
  },
});

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

import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import LogIn from './LogIn'
import Home from './Home'
import Product from './ProductPage/Product.tsx'
import Shop from './ShopPage/Shop.tsx'
import Test from './test.tsx' //TODO delete me
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { MaterialTailwindTheme, ThemeProvider as ThemeProviderTailwind} from "@material-tailwind/react";
import Header from './Header'
import UserInformation from './UserInformationPage/UserInformation.tsx'
import Shoppingcart from './ShoppingcartPage/Shoppingcart.tsx'
import OrderCreate from './OrderPage/OrderCreate.tsx'
import Search from './Search.tsx'
import OrderListPage from './OrderPage/Order.tsx'
import SignUp from './SignUp.tsx'
import Verify from './UserInformationPage/Verify.tsx'


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
          <Route path='' element={<Header/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/search/:keyword' element={<Search/>}></Route>
            <Route path='/Product/:id' element={<Product/>}></Route>
            <Route path='/login' element={<LogIn/>}></Route>
            <Route path='/PersionalInformation' element={<UserInformation/>}></Route>
            <Route path='/ShoppingCart' element={<Shoppingcart/>}></Route>
            <Route path='/Shop/:id' element={<Shop/>}></Route>
            <Route path='/test' element={<Test/>}></Route>
            <Route path='/order/create' element={<OrderCreate/>}></Route>
            <Route path='/order' element={<OrderListPage/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

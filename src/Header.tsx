import {useEffect , useState} from 'react'
//import './Header.scss'
import {Logo} from './img_src.json'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
// import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import {Link, useLocation} from 'react-router-dom'


function Header() {

    const [isLogIn, setIsLogIn] = useState<boolean>(false)

    const location = useLocation()
    useEffect(()=>{
        if(location.pathname === '/login'){
            setIsLogIn(true)
        }
        else{
            setIsLogIn(false)
        }
        console.log(location.pathname)
    },[location])


    return (
        <header className=' bg-blue-gray-700 h-20 p-3 flex items-center'>
            <div className=' h-full w-auto bg-blue-gray-400 rounded-full p-2 box-border hover:animate-pulse'>            
                <Link to={'/'} id='shopeeLogo' className=' h-full flex items-center'>
                    <img src={Logo} className=' h-full'/>
                    <span className=' flex-nowrap'>Shopee Home</span>
                </Link>
            </div>
            {!isLogIn && 
            <div id = "searchbox" className=' h-full w-4/6 p-1 box-border'>
                <Paper component='form' sx={{p: '2px 4px', ml:'10px', display: 'flex', alignItems: 'center', width: "100%", height: "95%"}}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜尋產品或賣家"/>                    
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            }
            {isLogIn && 
            <div id ="logintext" className=' h-full w-3/5 p-3 box-border text-white text-4xl flex items-center'>
                Login
            </div>
            }
            <div id='accountArea' className=' h-full ml-auto p-1 box-border flex items-center'>
                {!isLogIn && 
                <div id='notLogin' className=' ml-auto hover:animate-pulse'>
                    <Link to={'login'}>
                        <Chip sx={{color:'white', width:"auto%"}} avatar={<Avatar>N</Avatar>} variant='outlined' label="Log In" />
                    </Link>
                </div>
                }
            </div>
        </header>
    )
}

export default Header
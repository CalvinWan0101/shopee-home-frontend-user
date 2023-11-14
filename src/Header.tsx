import React from 'react'
import {useEffect , useState} from 'react'
import './Header.scss'
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
        <header>
            <Link to={'/'} id='shopeeLogo'>
                <div>
                    <img src={Logo}/>
                    <div>Shopee Home</div>
                </div>
            </Link>
            {!isLogIn && <div id = "searchbox">
                <Paper component='form' sx={{p: '2px 4px', ml:'10px', display: 'flex', alignItems: 'center', width: "100%", height: "95%"}}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜尋產品或賣家"/>                    
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>}
            {isLogIn && <div id ="logintext">
                Login
            </div>}
            <div id='accountArea'>
                {!isLogIn && <div id='notLogin'>
                    <Link to={'login'}>
                        <Chip sx={{color:'white', width:"100%"}} avatar={<Avatar>N</Avatar>} variant='outlined' label="Log In" />
                    </Link>
                </div>}
            </div>
        </header>
    )
}

export default Header
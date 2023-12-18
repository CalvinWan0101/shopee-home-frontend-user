import {useEffect , useState} from 'react'
import React from 'react';
import {Link, useLocation} from 'react-router-dom'

import './Color.scss'
import {Logo} from './img_src.json'
import {Login , useLoginStore} from './LoginState'

import {Avatar , Divider , IconButton , InputBase , Paper , Icon} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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

    const {LoginState , setLoginState} = useLoginStore<Login>( (state) => state) ;

    return (
        <header className=' h-20 p-3 flex items-center bg3'>
            <div className=' h-full w-auto rounded-full p-2 box-border hover:animate-pulse'>
                <Link to={'/'} id='shopeeLogo' className=' h-full flex items-center'>
                    <Icon component={ShoppingCartIcon} fontSize='large'></Icon>
                    <span className=' flex-nowrap text-2xl ml-2'>Shopee Home</span>
                </Link>
            </div>
            {!isLogIn && 
            <div id = "searchbox" className=' h-full w-3/6 p-1 ml-5 box-border'>
                <Paper component='form' className='bg1' sx={{p: '2px 4px', ml:'10px', display: 'flex', alignItems: 'center', width: "100%", height: "95%"}}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜尋產品或賣家"/>                    
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            }
            {isLogIn && 
            <div id ="logintext" className=' h-full w-3/5 p-3 box-border text-2xl flex items-center text-gray-400'>
                Login
            </div>
            }
            <div id='accountArea' className=' h-full ml-auto p-1 box-border flex items-center'>
                {!isLogIn && !LoginState &&
                // <div id='notLogin' className=' h-full w-auto rounded-full p-1 box-border  hover:animate-pulse'>
                //     <Link to={'login'} className=' h-full flex items-center'>
                //         <Avatar></Avatar>
                //         <span className=' flex-nowrap text-2xl ml-2 m-2'>Log In</span>
                //     </Link>
                // </div>
                <Link to={'login'}>
                    <Avatar></Avatar>
                </Link>
                }
            </div>
        </header>
    )
}

export default Header
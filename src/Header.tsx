import {useEffect , useRef, useState} from 'react'
import React from 'react';
import {Link, useLocation , Outlet , useNavigate} from 'react-router-dom'

import '/src/css/Color.scss'
import '/src/css/Animation.scss'
import {Login , useLoginStore} from './LoginState'
import Img from '@/assets/testProductImg.jpg'
import UserAvater from './UserAvater.tsx'

import { Divider , IconButton , InputBase , Paper , Icon , ButtonBase , Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import {Drawer , Typography , List , ListItem , ListItemPrefix , ListItemSuffix , Chip} from '@material-tailwind/react'
import { deepOrange, deepPurple } from '@mui/material/colors';


function Header() {

    const {LoginState , User , Logout} = useLoginStore<Login>( (state) => state );

    const navigate = useNavigate()

    const [centerText, setCenterText] = useState<string>("")

    const [open , setOpen] = useState<boolean>(false)
    const openDrawer = () => setOpen(true)
    const closeDrawer = () => setOpen(false)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        }, [open]);

    const location = useLocation()
    useEffect(()=>{
        switch(location.pathname){
            case '/login':
                setCenterText('Login')
                break;
            case '/signup':
                setCenterText('Signup')
                break;
            case '/PersionalInformation':
                setCenterText('Persional Information')
                break;
            case '/Shoppingcart':
                setCenterText('ShoppingCart')
                break;
            case '/order':
                setCenterText('Order')
                break;
            case '/order/create':
                setCenterText('Checkout')
                break;
            default:
                setCenterText("")
        }
        const autoScoll = document.getElementById('autoScoll') as HTMLElement 
        autoScoll.scrollTop = 0;
    },[location])

    function AccountArea(){

        return(
            <div className=' h-full ml-auto p-1 box-border flex items-center'>
                {!LoginState &&
                <Link to={'login'}>
                    <ButtonBase>
                        <Avatar></Avatar>
                    </ButtonBase>
                </Link>
                }
                {LoginState &&
                <ButtonBase onClick={openDrawer}>
                    <UserAvater User={User}/>
                </ButtonBase>
                }
            </div>
        )
    }

    function CenterArea(){

        const [keyword , setKeyword] = useState("")

        function handleSearch(){
            if (keyword != ""){
                navigate('/search/' + keyword)
            }
        }

        return(
            <div className=' h-full w-3/6 p-1 ml-5 box-border'>
                {(centerText === "") ?
                <Paper component='form' className='bg1' sx={{p: '2px 4px', ml:'10px', display: 'flex', alignItems: 'center', width: "100%", height: "95%"}}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜尋產品" onKeyDown={(Event) => {if(Event.key === "Enter"){handleSearch()}}} onChange={(event) => setKeyword(event.target.value)}/>                    
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper> :
                <div id ="logintext" className=' p-2 box-border text-2xl flex items-center text-gray-400'>
                    {centerText}
                </div>
                }
            </div>
        )
    }

    function Logo(){
        return(
            <div className=' h-full w-auto rounded-full p-2 box-border hover:animate-pulse'>
                <Link to={'/'} id='shopeeLogo' className=' h-full flex items-center'>
                    <Icon component={ShoppingCartIcon} fontSize='large'></Icon>
                    <span className=' flex-nowrap text-2xl ml-2'>Shopee Home</span>
                </Link>
            </div>
        )
    }

    return (
        <>
            <div id='autoScoll' className=' h-screen overflow-y-scroll'>
                <header className=' h-20 p-3 flex items-center bg3'>
                    <Logo/>
                    <CenterArea/>
                    <AccountArea/>
                </header>
                <div className=' h-full '>
                    <Outlet/>
                </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} placement='right' className=' p-4'>
                <div className=" ml-2 mb-6 flex flex-wrap items-center justify-between">
                    <div className=' w-full flex justify-end'>
                        <IconButton type="button" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </IconButton>
                    </div>

                    <div className=' flex items-center'>
                        <UserAvater User={User}/>
                        <Typography variant="h5" className=' ml-2'>{User.name}</Typography>
                    </div>
                </div>
                <List>
                    <ListItem onClick={() => {closeDrawer(); navigate("/PersionalInformation");}}>
                        <ListItemPrefix>
                            <PersonIcon/>
                        </ListItemPrefix>
                        Persional Information
                    </ListItem>
                    <ListItem onClick={() => {closeDrawer(); navigate("/Shoppingcart");}}>
                        <ListItemPrefix>
                            <ShoppingCartIcon/>
                        </ListItemPrefix>
                        ShoppingCart
                        {/* <ListItemSuffix>
                            <Chip value="5" size="sm" color='light-green' className="rounded-full"/>
                        </ListItemSuffix> */}
                    </ListItem>
                    <ListItem onClick={() => {closeDrawer(); navigate("/order");}}>
                        <ListItemPrefix>
                            <ReceiptLongIcon/>
                        </ListItemPrefix>
                        Order
                    </ListItem>
                    <ListItem onClick={() => {closeDrawer(); Logout(); navigate('/');}}
                        className=' text-red-900 hover:text-red-900 active:text-red-900 focus:text-red-900'>
                        <ListItemPrefix>
                            <LogoutIcon/>
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Drawer>
        </>

    )
}

export default Header
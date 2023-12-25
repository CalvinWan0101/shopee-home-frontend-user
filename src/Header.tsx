import {useEffect , useState} from 'react'
import React from 'react';
import {Link, useLocation , Outlet , useNavigate} from 'react-router-dom'

import '/src/css/Color.scss'
import '/src/css/Animation.scss'
import {Login , useLoginStore} from './LoginState'
import UserImg from './assets/testProductImg.jpg'

import { Divider , IconButton , InputBase , Paper , Icon , ButtonBase , Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {Drawer , Typography , List , ListItem , ListItemPrefix , ListItemSuffix , Chip} from '@material-tailwind/react'


function Header() {

    const navigate = useNavigate()

    const [isLogIn, setIsLogIn] = useState<boolean>(false)

    const [open , setOpen] = useState<boolean>(false)
    const openDrawer = () => setOpen(true)
    const closeDrawer = () => setOpen(false)
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        }, [open]);

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

    function AccountArea(){
        return(
            <div className=' h-full ml-auto p-1 box-border flex items-center'>
                {!isLogIn && !LoginState &&
                <Link to={'login'}>
                    <ButtonBase>
                        <Avatar></Avatar>
                    </ButtonBase>
                </Link>
                }
                {!isLogIn && LoginState &&
                <ButtonBase onClick={openDrawer}>
                    <Avatar src={UserImg}></Avatar>
                </ButtonBase>
                }
            </div>
        )
    }

    function AccountDrawer(){
        return(
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
                        <Avatar src={UserImg}></Avatar>
                        <Typography variant="h5" className=' ml-2'>UserName </Typography>
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
                        <ListItemSuffix>
                            <Chip value="5" size="sm" color='light-green' className="rounded-full"/>
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <ReceiptLongIcon/>
                        </ListItemPrefix>
                        Order
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <LocalActivityIcon/>
                        </ListItemPrefix>
                        Coupon
                    </ListItem>
                </List>
            </Drawer>
        )
    }

    function CenterArea(){
        return(
            <div className=' h-full w-3/6 p-1 ml-5 box-border'>
                {!isLogIn &&
                <Paper component='form' className='bg1' sx={{p: '2px 4px', ml:'10px', display: 'flex', alignItems: 'center', width: "100%", height: "95%"}}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜尋產品或賣家"/>                    
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                }
                {isLogIn &&
                <div id ="logintext" className=' p-2 box-border text-2xl flex items-center text-gray-400'>
                    Login
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
            <AccountDrawer/>
            <div className=' h-screen overflow-scroll'>
                <header className=' h-20 p-3 flex items-center bg3'>
                    <Logo/>
                    <CenterArea/>
                    <AccountArea/>
                </header>
                <div className=' h-full '>
                    <Outlet/>
                </div>
            </div>
        </>

    )
}

export default Header
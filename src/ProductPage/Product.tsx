//import react
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Params, useParams , Link, useNavigate } from 'react-router-dom'

//import other
import ProductImg from '@/assets/testProductImg.jpg'
import '/src/css/Color.scss'
import { Login , useLoginStore } from '../LoginState'
import { IOrderCreate , useOrderCreateStore } from '../OrderPage/OrderCreateStore';

//import material UI
import { Card, Grid, Paper , Typography , Chip , Avatar , IconButton , Snackbar , MuiAlert, Alert} from '@mui/material';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import ElectricRickshawTwoToneIcon from '@mui/icons-material/ElectricRickshawTwoTone';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Carousel, Accordion, AccordionHeader, AccordionBody, Button} from "@material-tailwind/react";
import { green } from '@mui/material/colors';
import axios from 'axios';
import { baseURL } from '../APIconfig';

function Product() {

    const {id} = useParams<string>(); // 取得產品ID

    const [name , setName] = useState("")
    const [amount , setAmount] = useState(0)
    const [sales , setSales] = useState(0)
    const [price , setPrice] = useState(1000000)
    const [description , setDescription] = useState("")
    const [discountRate , setDiscountRate] = useState<number | null>(1)
    const [discountDate , setDiscountDate] = useState<Date | null>()
    const [shopid , setShopid] = useState("")
    const [image , setImage] = useState<string[]>([])
    const [deleted , setDeleted] = useState(false)

    const [shopImage , setShopImage] = useState("")
    const [shopName , setShopName] = useState("")
    const [shopId , setShopId] = useState("")

    const [addShoppingcartSuccess , setAddShoppingcartSuccess] = useState(false)

    const canBuy = () => {
        if (deleted === true){
            return false
        }
        if (amount <= 0){
            return false
        }
        return true
    }

    useEffect(() => {
        axios
        .get<ProductDetail>(baseURL + "product/" + id)
        .then((response) => {
            setName(response.data.name)
            setAmount(response.data.amount)
            setSales(response.data.sales)
            setPrice(response.data.price)
            setDescription(response.data.description)
            setDiscountRate(response.data.discountRate)
            setDiscountDate(response.data.discountDate)
            setShopid(response.data.shopId)
            setImage(response.data.images)
            setDeleted(response.data.deleted)
    
            // promise 鍊
            return axios.get<Shop>(baseURL + 'shop/' + response.data.shopId);
        })
        .then((response) => {
            setShopImage(response.data.avatar)
            setShopName(response.data.name)
            setShopId(response.data.id)
        })
        .catch((error) => {
            console.log(error)
        });
    } , [])
    
    function ProductArea(){

        const [selectQuantity , setCount] = useState(1)

        const {User , LoginState} = useLoginStore<Login>((state) => state)

        const navigate = useNavigate()

        function handleAddToShoppingCart(){
            if (!LoginState){
                navigate('/login')
            }
            if (!canBuy()){
                0
            }
            else{
                axios
                .put(`${baseURL}shopping_cart/product` , {
                    userId:User.id,
                    productId:id,
                    quantity:selectQuantity
                })
                .then((response) => {
                    setAddShoppingcartSuccess(true)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }

        const {setProductList} = useOrderCreateStore<IOrderCreate>((state) => state)

        function handleBuy(){
            if (!LoginState){
                navigate('/login')
            }
            if (!canBuy()){
                0
            }
            else{
                setProductList([{
                    id:            id as string,
                    image:         image[0],
                    name:          name,
                    price:         parseInt(`${price * (discountRate == null ? 1 : discountRate)}`),
                    quantity:      selectQuantity,
                    quantityLimit: 0,
                }] , shopId)
                navigate('/order/create')
            }
        }

        return(
            <Paper sx={{my:4, p: 2}} className='bg2' elevation={5}>
                <Grid container spacing={2}>
                    <Grid item width={400}>
                        <Carousel loop className=' rounded-3xl h-96 w-96 dark-border'>
                            {image.map((items , index) => (
                                <img src={items} alt={'image' + index} key={index} className=' h-full w-full object-cover'/>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs minWidth={400}>
                        <div className=' px-5 h-full flex flex-col'>
                            <Typography variant='h5' sx={{mb:2}}>
                                {name}
                            </Typography>
                            {/* <Rating unratedColor='light-green' ratedColor='light-green' className=' mb-1'/> */}
                            <div className=''>
                                {(discountRate == null ? false : true) && 
                                <Typography variant='h4' color={'gray'} className=' line-through'>
                                    {'$' + price}
                                </Typography>}
                                <Typography variant='h2' color={green[500]} className=''>
                                    {'$' + parseInt(`${price * (discountRate == null ? 1 : discountRate)}`)}
                                </Typography>
                            </div>
                            <div className=' flex items-center mt-auto mb-3'>
                                <IconButton size='large' onClick={() => setCount(selectQuantity - 1)} disabled={(selectQuantity === 1) || !canBuy()} color='success'>
                                    <RemoveIcon sx={{height: 38 , width: 38}} />
                                </IconButton>
                                <Typography variant='h5'>{canBuy() ? selectQuantity : 0}</Typography>
                                <IconButton size='large' onClick={() => setCount(selectQuantity + 1)} disabled={selectQuantity >= amount || !canBuy()} color='success'>
                                    <AddIcon sx={{height: 38 , width: 38}}/>
                                </IconButton>
                                <Typography variant='h5' color={'gray'}>{"商品庫存 : " + amount}</Typography>
                            </div>
                            <Grid container className=' mb-1'>
                                <Grid item xs={6} className=' pl-2 pr-2'>
                                    <Button color='light-green' className='flex items-center w-full' onClick={handleAddToShoppingCart}>
                                        <AddShoppingCartTwoToneIcon fontSize='large' className=' ml-auto text-white'></AddShoppingCartTwoToneIcon>
                                        <div className=' ml-1 mr-auto text-xl text-white'>
                                            加入購物車
                                        </div>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className=' pl-2 pr-2'>
                                    <Button color='green' className=' flex items-center w-full' onClick={handleBuy}>
                                        <ElectricRickshawTwoToneIcon fontSize='large' className=' ml-auto text-white'></ElectricRickshawTwoToneIcon>
                                        <div className=' ml-1 mr-auto text-xl text-white'>
                                            立即購買
                                        </div>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    function ShopArea(){
        return(
            <Paper sx={{my:4, p: 2}} className='bg2'  elevation={5}>
                <Link to={'/Shop/' + shopid}  className='flex text-center items-center'>
                    <Avatar src={shopImage}></Avatar>
                    <span className=' flex-nowrap text-2xl ml-2'>{shopName}</span>
                </Link>
            </Paper>
        )
    }

    function ProductInfoArea(){

        const [open, setOpen] = useState(0);

        const handleOpen = (value:number) => setOpen(open === value ? 0 : value);

        function Icon(props:{ id:number, open:number }) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`${props.id === props.open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            );
        }

        return(
            <Paper sx={{my:4, p: 2}} className='bg2'  elevation={5}>
                <Accordion  open={open === 1} icon={ <Icon id={1} open={open}/> }>
                    <AccordionHeader onClick={() => handleOpen(1)}>商品資訊</AccordionHeader>
                    <AccordionBody>
                        <Typography variant='subtitle1' className=' whitespace-break-spaces'>
                            {description}
                        </Typography>
                    </AccordionBody>
                </Accordion>
            </Paper>
        )
    }

    return (
        <>
            <div className=' pb-1 px-20'>
                <ProductArea/>
                <ShopArea/>
                <ProductInfoArea/>
            </div>
            <Snackbar open={addShoppingcartSuccess} autoHideDuration={6000}>
                <Alert severity='success' style={{backgroundColor:"#A7ECA9"}} onClose={() => setAddShoppingcartSuccess(false)}>
                    成功加入購物車
                </Alert>
            </Snackbar>
            <Snackbar open={!canBuy()}>
                <Alert severity='error' style={{}}>
                    {deleted === true && '此產品已下架'}
                    {amount <= 0 && '此產品目前無庫存'}
                </Alert>
            </Snackbar>
        </>
    )
}
    export default Product  
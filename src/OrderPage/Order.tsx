import React, { useEffect, useState } from 'react'

import '@/css/Color.scss'
import Img from '@/assets/testProductImg.jpg' //TODO delete me
import OrderProductCard from './OrderProductCard'
import { Login , useLoginStore } from '../LoginState' 

import {Accordion , AccordionSummary , AccordionDetails , Typography , Paper , Avatar} from '@mui/material'
import {Button} from '@material-tailwind/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brown, green, grey , red } from '@mui/material/colors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useNavigate } from 'react-router-dom'
import { Order } from './OrderInterface'
import axios from 'axios'
import { baseURL } from '../APIconfig'
import { error } from 'console'

function OrderListPage() {

    const navigate = useNavigate()

    const {LoginState , User} = useLoginStore<Login>((state) => state)
    
    const [orderList , setOrderList] = useState<Order[]>([])

    const [update , setUpdate] = useState(0)

    useEffect(() => {
        if (LoginState){
            axios
            .get<Order[]>(`${baseURL}order/user_id/${User.id}`)
            .then((response) => {
                console.log(response.data)
                setOrderList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else{
            navigate('/login')
        }
    } , [update])

    return (
        <>
            <div className=' px-40 pt-5'>
                {orderList.map((order) => (
                    <OrderCard onFinish={() => setUpdate(update + 1)} order={order} key={order.id}/>
                ))}
            </div>
        </>
    )
}

export default OrderListPage

function OrderCard(props:{order : Order , onFinish : () => void}){

    function handleFinishOrder(){
        axios
        .put(`${baseURL}order/receive/${props.order.id}`)
        .then((response) => {
            console.log(response)
            props.onFinish()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // use season coupon
    const isSeason = () => {
        return (props.order.rate != 0)
    }

    // use shipping coupon
    const isShipping = () => {
        return props.order.shippingCost === 0
    }

    const discount = () => {
        if (isSeason()){
            let price = 0
            props.order.products.forEach(element => {
                price += element.price * element.quantity
            });
            return Math.ceil(price - props.order.rate * price)
        }
        else if (isShipping()){
            return 60
        }
    }

    return(
        <div className=' pb-5'>
            <Accordion className='bg3'>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <div className=' w-3/4 flex items-center'>
                        <Typography variant='h6'>
                            Order ID : {props.order.id} 
                            {(props.order.startTime != null && props.order.deliverTime != null) && <span className=' text-green-300'>(已完成)</span>}
                            {(props.order.startTime === null && props.order.deliverTime === null) && <span className=' text-red-600'>(未出貨)</span>}
                        </Typography>
                        {(props.order.startTime != null && props.order.deliverTime === null) && 
                            <Button variant='outlined' color='green' className=' w-20 ml-3' onClick={handleFinishOrder}>取貨</Button>
                        }
                    </div>
                    <div className=' w-1/4 flex justify-end pr-3'>
                        <Typography variant='h6' color={green[500]}>
                            {`$${props.order.totalPrice}`}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className=''>
                    {/* <div className=' ml-1 mb-2 flex items-center'>
                        <Avatar src={Img} alt='shop avater'/>
                        <Typography ml={1} variant='h5'>Shop 1</Typography>
                    </div> */}
                    {props.order.products.map((product) => (
                        <div key={product.id} className=' pt-2'>
                            <OrderProductCard name={product.name} price={product.price} quantity={product.quantity} image={product.image}/>
                        </div>
                    ))}
                    <div className=' pt-4'>
                        <Paper sx={{p:1}} className='bg2'>
                            <div className=' flex'>
                                <div className=' w-2/3'>
                                    <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces pl-1'>
                                        <LocalShippingIcon fontSize='large'/>
                                        <span className=' ml-3'>{props.order.address}</span>
                                    </Typography>
                                </div>
                                <div className=' w-1/3 flex flex-col justify-center items-end pr-3'>
                                    <Typography variant='h5' color={green[500]}>
                                        $60
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    {(isSeason() || isShipping()) &&
                        <div className=' pt-4'>
                            <Paper sx={{p:1}} className='bg2'> {/*TODO coupon */}
                                <div className=' flex'>
                                    <div className=' w-2/3'>
                                        <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces'>
                                            <LocalActivityIcon fontSize='large'/>
                                            {isShipping() && <span className=' ml-3'>{`滿$${props.order.shippingLimit}免運費`}</span>}
                                            {isSeason() && <span className=' ml-3'>{`單筆訂單打${props.order.rate.toString().split(".")[1]}折`}</span>}
                                        </Typography>
                                    </div>
                                    <div className=' w-1/3 flex justify-end pr-3'>
                                        <Typography variant='h5' color={red[900]}>
                                            {`-$${discount()}`}
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    }
                    <div className=' pt-4'>
                        <Paper sx={{p:1}} className='bg2'> {/*TODO date */}
                            <div className=' flex items-center'>
                                <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces'>
                                    <AccessTimeFilledIcon fontSize='large'/>
                                </Typography>
                                <div className=' flex flex-col ml-3'>
                                    <Typography variant='body2' color={grey[500]}>
                                        {`From : ${(props.order.startTime === null) ? "-" : props.order.startTime}`}
                                    </Typography>
                                    <Typography variant='body2' color={grey[500]}>
                                        {`Due : ${(props.order.deliverTime === null) ? "-" : props.order.deliverTime}`}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
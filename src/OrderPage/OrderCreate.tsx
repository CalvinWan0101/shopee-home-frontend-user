import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '@/css/Color.scss'
import Img from '@/assets/testProductImg.jpg' //TODO delete me
import './StepperStyle.scss'
import { Login , useLoginStore } from '../LoginState'
import OrderProductCard from './OrderProductCard'
import { baseURL } from '../APIconfig.ts'
import { IOrderCreate , useOrderCreateStore } from './OrderCreateStore.ts'

import { Box, Paper , Step, StepLabel, Stepper, Typography , TextField , Grid} from '@mui/material'
import { Button , List , ListItem , ListItemPrefix , ListItemSuffix } from '@material-tailwind/react'
import {green, red} from '@mui/material/colors'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

function OrderCreate() {
    const steps = [
        'Confirm product list',
        'Select address',
        'Select Coupon',
        'Check price'
    ];

    const {User , LoginState} = useLoginStore<Login>( (state) => state )
    const {
        shippingCouponList , setShippingCouponList ,
        seasoningCouponList , setSeasoningCouponList,
        price , setPrice,
    } = useOrderCreateStore<IOrderCreate>( (state) => state )

    const [activeStep , setActiveStep] = useState<number>(-1)

    const [shopId , setShopId] = useState("1013f7a0-0017-4c21-872f-c014914e6834")

    //setPrice(2755)

    useEffect(() => {
        setActiveStep(0)
    } , [])

    useEffect(() => {
        if (LoginState){
            axios
            .get<ShopCouponList>(`${baseURL}coupon/user/${User.id}/shop/${shopId}`) // TODO shopID
            .then((response) => {
                setSeasoningCouponList(response.data.seasoningCouponUserDtos.filter((item) => item.claimed))
                setShippingCouponList(response.data.shippingCouponUserDtos.filter((item) => item.claimed))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    } , [])

    const [address , setAddress] = useState("")

    function canNext(){
        if (activeStep === 3){
            return true
        }
        if(address === "" && activeStep === 1){
            return true
        }
        return false
    }

    return (
        <>
            <Box sx={{width:'100%' , mt: 5}} className=''>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel sx={{'& .css-s84u20-MuiStepLabel-root .MuiSvgIcon-root circle':{
                                    backgroundColor:green[500]
                            }}}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className=' w-full flex justify-center pt-2'>
                    <div className=' w-5/6 items-center bg1 p-5 overflow-hidden relative'>
                            {activeStep === 0 &&
                            <div className=' p-3'>
                                <div className=' mb-2'> {/*TODO product list*/}
                                    <OrderProductCard/>
                                </div>
                                <div className=' mb-2'>
                                    <OrderProductCard/>
                                </div>
                                <div className=' mb-2'>
                                    <OrderProductCard/>
                                </div>
                            </div>}
                            {activeStep === 1 &&
                            <div className=' p-3'>
                                <TextField id="address" sx={{width:'98%' , my:1}} label="Address" variant="outlined" color='success' 
                                    onChange={Event => setAddress(Event.target.value)} value={address}/>
                                {User.addresses.map((value , index) => (
                                    <Button key={index} color='green' className=' m-2' onClick={() => setAddress(value)}>{value}</Button>
                                ))}
                            </div>}
                            {activeStep === 2 &&
                            <div>
                                <CouponList/> {/*TODO Coupon list*/}
                            </div>}
                            {activeStep === 3 &&
                            <div>
                                <TotalPriceArea/> {/*TODO total price*/}
                            </div>}
                    </div>
                </div>
                <footer className=" p-7 fixed bottom-0 w-full flex justify-between">
                    <Button color='green' disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
                        Back
                    </Button>
                    <Button color='green' disabled={canNext()} onClick={() => setActiveStep(activeStep + 1)}>
                        Next
                    </Button>
                </footer>
            </Box>
        </>
    )

    
    function CouponList(){ //TODO Coupon ALL

        const {selectCouponId: couponId , setSelectCouponId: setCouponId , setDiscount} = useOrderCreateStore<IOrderCreate>((state) => state)
        
        return(
            <Grid container>
                <Grid item xs={6} p={2}>
                    <Typography variant='h5' color={'green'}>免運券</Typography>
                    <List>
                        {shippingCouponList.map((item , index) => (
                            <ListItem key={index} style={(item.id === couponId) ? {color:'green'} : {}}
                            onClick={() => {setCouponId(item.id); setDiscount(60);}} className=' bg2' disabled={(price < item.shippingLimit)}>
                                <ListItemPrefix>
                                    <LocalActivityIcon/>
                                </ListItemPrefix>
                                {`單筆滿$${item.shippingLimit}免運費`}
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={6} p={2}>
                    <Typography variant='h5' color={'green'}>折價券</Typography>
                    <List>
                        {seasoningCouponList.map((item , index) => (
                            <ListItem key={index} style={(item.id === couponId) ? {color:'green'} : {}}
                            onClick={() => {setCouponId(item.id); setDiscount(item.rate * price)}} className=' bg2'>
                                <ListItemPrefix>
                                    <LocalActivityIcon/>
                                </ListItemPrefix>
                                {`單筆訂單打${item.rate.toString().split(".")[1]}折`}
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        )
    }

    function TotalPriceArea(){
        const titleArea = 9
        const priceArea = 3
        const {discount} = useOrderCreateStore<IOrderCreate>((state) => state)
        return(
            <>
                <div className=' flex justify-center w-full'>
                    <Grid container width={"40%"}>
                        <Grid item xs={titleArea}>
                            <Typography variant='h5' color={'black'}>
                                Price:
                            </Typography>
                        </Grid>
                        <Grid item xs={priceArea}>
                            <Typography variant='h5' color={'green'} pl={1}> {/*TODO price*/}
                                $2700
                            </Typography>
                        </Grid>
                        <Grid item xs={titleArea}>
                            <Typography variant='h5' color={'black'}>
                                Freight:
                            </Typography>
                        </Grid>
                        <Grid item xs={priceArea}>
                            <Typography variant='h5' color={'green'} pl={1}>
                                $60
                            </Typography>
                        </Grid>
                        <Grid item xs={titleArea}>
                            <Typography variant='h5' color={'black'}>
                                Coupon:
                            </Typography>
                        </Grid>
                        <Grid item xs={priceArea}>
                            <Typography variant='h5' color={red[900]}> {/*TODO coupon discount*/}
                                {`-$${discount}`}
                            </Typography>
                        </Grid>
                        <div className=' w-full h-[1px] bg-gray-600 my-1'/>
                        <Grid item xs={titleArea}>
                            <Typography variant='h5' color={'black'}>
                                Total:
                            </Typography>
                        </Grid>
                        <Grid item xs={priceArea}>
                            <Typography variant='h5' color={'green'} pl={1}> {/*TODO total price*/}
                                $2700
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className=' flex justify-center w-full mt-20'>
                    <Button className=' w-3/5 animate-bounce' color='green'>
                        <Typography variant='h1'> {/*TODO Buy (create order)*/}
                            {'Buy'}
                        </Typography>
                    </Button>
                </div>
            </>
        )
    }
}

export default OrderCreate
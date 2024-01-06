import React, { useEffect, useState } from 'react'

import '@/css/Color.scss'
import Img from '@/assets/testProductImg.jpg' //TODO delete me
import './StepperStyle.scss'
import { Login , useLoginStore } from '../LoginState'
import OrderProductCard from './OrderProductCard'

import { Box, Paper , Step, StepLabel, Stepper, Typography , TextField , Grid} from '@mui/material'
import { Button , List , ListItem , ListItemPrefix , ListItemSuffix } from '@material-tailwind/react'
import {green, red} from '@mui/material/colors'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SwipeableViews from 'react-swipeable-views'

function OrderCreate() {
    const steps = [
        'Confirm product list',
        'Select address',
        'Select Coupon',
        'Check price'
    ];

    const {User} = useLoginStore<Login>( (state) => state )

    const [activeStep , setActiveStep] = useState<number>(0)
    useEffect(() => {
        //setActiveStep(1)
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
                        <SwipeableViews disableLazyLoading index={activeStep}>
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
                            </div>
                            <div className=' p-3'>
                                <TextField id="address" sx={{width:'98%' , my:1}} label="Address" variant="outlined" color='success' 
                                    onChange={Event => setAddress(Event.target.value)} value={address}/>
                                {User.addresses.map((value , index) => (
                                    <Button key={index} color='green' className=' m-2' onClick={() => setAddress(value)}>{value}</Button>
                                ))}
                            </div>
                            <div>
                                <CouponList/> {/*TODO Coupon list*/}
                            </div>
                            <div>
                                <TotalPriceArea/> {/*TODO total price*/}
                            </div>
                        </SwipeableViews>
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
        return(
            <Grid container>
                <Grid item xs={6} p={2}>
                    <Typography variant='h5' color={'green'}>免運券</Typography>
                    <List>
                        <ListItem  className=' bg2'>
                            <ListItemPrefix>
                                <LocalActivityIcon/>
                            </ListItemPrefix>
                            優惠券
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} p={2}>
                    <Typography variant='h5' color={'green'}>折價券</Typography>
                    <List>
                        <ListItem  className=' bg2'>
                            <ListItemPrefix>
                                <LocalActivityIcon/>
                            </ListItemPrefix>
                            優惠券
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        )
    }

    function TotalPriceArea(){
        const titleArea = 9
        const priceArea = 3
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
                                -$60
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
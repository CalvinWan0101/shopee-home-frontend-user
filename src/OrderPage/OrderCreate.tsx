import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '@/css/Color.scss'
import Img from '@/assets/testProductImg.jpg' //TODO delete me
import './StepperStyle.scss'
import { Login , useLoginStore } from '../LoginState'
import OrderProductCard from './OrderProductCard'
import { baseURL } from '../APIconfig.ts'
import { IOrderCreate , useOrderCreateStore } from './OrderCreateStore.ts'
import CouponList from './CouponList.tsx'
import TotalPriceArea from './TotalPriceArea.tsx'

import { Box, Paper , Step, StepLabel, Stepper, Typography , TextField , Grid} from '@mui/material'
import { Button } from '@material-tailwind/react'
import {green, red} from '@mui/material/colors'

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
        selectAddress , setSelectAddress,
        productList,
        shopId
    } = useOrderCreateStore<IOrderCreate>( (state) => state )

    const [activeStep , setActiveStep] = useState<number>(0)

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

    function canNext(){
        if (activeStep === 3){
            return true
        }
        if(selectAddress === "" && activeStep === 1){
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
                            {productList.map((product) => (
                                <div key={product.id} className=' mb-2'>
                                    <OrderProductCard name={product.name} price={product.price} quantity={product.quantity} image={product.image}/>
                                </div>
                            ))}
                        </div>}
                        {activeStep === 1 &&
                        <div className=' p-3'>
                            <TextField id="address" sx={{width:'98%' , my:1}} label="Address" variant="outlined" color='success' 
                                onChange={Event => setSelectAddress(Event.target.value)} value={selectAddress}/>
                            {User.addresses.map((value , index) => (
                                <Button key={index} color='green' className=' m-2' onClick={() => setSelectAddress(value)}>{value}</Button>
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
}

export default OrderCreate
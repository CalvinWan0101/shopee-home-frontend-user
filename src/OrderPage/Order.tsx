import React from 'react'

import '@/css/Color.scss'
import Img from '@/assets/testProductImg.jpg' //TODO delete me
import OrderProductCard from './OrderProductCard'

import {Accordion , AccordionSummary , AccordionDetails , Typography , Paper , Avatar} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brown, green, grey , red } from '@mui/material/colors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function Order() {
    return (
        <>
            <div className=' px-40 pt-5'> {/*TODO order list */}
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </div>
        </>
    )
}

export default Order

function OrderCard(){
    const startDate = new Date(2023 , 1 , 30 , 11 , 7)
    const endDate = new Date(2024 , 1 , 6 , 6 , 7)
    return(
        <div className=' pb-5'>
            <Accordion className='bg3'>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <div className=' w-1/2'>
                        <Typography variant='h6'>
                            Order ID : 123456789 <span className=' text-green-300'>(已完成)</span> {/* TODO order id/state */}
                        </Typography>
                    </div>
                    <div className=' w-1/2 flex justify-end pr-3'>
                        <Typography variant='h6' color={green[500]}> {/* TODO order price */}
                            $2700
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className=''>
                    <div className=' ml-1 mb-2 flex items-center'>
                        <Avatar src={Img} alt='shop avater'/> {/* TODO shop image */}
                        <Typography ml={1} variant='h5'>Shop 1</Typography> {/* TODO shop name */}
                    </div>
                    <div className=' pt-2'> {/* TODO product list */}
                        <OrderProductCard/>
                    </div>
                    <div className=' pt-2'>
                        <OrderProductCard/>
                    </div>
                    <div className=' pt-2'>
                        <OrderProductCard/>
                    </div>
                    <div className=' pt-4'>
                        <Paper sx={{p:1}} className='bg2'>{/*TODO address */}
                            <div className=' flex'>
                                <div className=' w-2/3'>
                                    <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces pl-1'>
                                        <LocalShippingIcon fontSize='large'/>
                                        <span className=' ml-3'>505 彰化縣鹿港鎮福東路10號</span>
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
                    <div className=' pt-4'>
                        <Paper sx={{p:1}} className='bg2'> {/*TODO coupon */}
                            <div className=' flex'>
                                <div className=' w-2/3'>
                                    <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces'>
                                        <LocalActivityIcon fontSize='large'/>
                                        <span className=' ml-3'>滿$300免運費</span>
                                    </Typography>
                                </div>
                                <div className=' w-1/3 flex justify-end pr-3'>
                                    <Typography variant='h5' color={red[900]}>
                                        -$60
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div className=' pt-4'>
                        <Paper sx={{p:1}} className='bg2'> {/*TODO date */}
                            <div className=' flex items-center'>
                                <Typography variant='h6' color={grey[600]} className=' whitespace-break-spaces'>
                                    <AccessTimeFilledIcon fontSize='large'/>
                                </Typography>
                                <div className=' flex flex-col ml-3'>
                                    <Typography variant='body2' color={grey[500]}>
                                        {`From : ${startDate}`}
                                    </Typography>
                                    <Typography variant='body2' color={grey[500]}>
                                        {`Due : ${endDate}`}
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
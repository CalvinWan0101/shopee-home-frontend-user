import React from 'react'

import Img from '@/assets/testProductImg.jpg' // TODO delete me

import { Paper , Typography } from '@mui/material'
import { green } from '@mui/material/colors'

function OrderProductCard() { // TODO product in order api
    return (
        <Paper className='bg2 flex p-1 items-center'>
            <img className=" rounded-md h-20 aspect-square" alt="ProductImg" src={Img}></img>
            <div className=' flex mx-4 w-full'>
                    <div className=' w-5/6 flex items-center overflow-hidden'>
                        <Typography variant='h5'><p className="line-clamp-2">商品名稱</p></Typography> {/*TODO product name*/}
                    </div>
                    <div className=' w-1/6 flex flex-col items-end justify-center'>
                        <Typography variant='h5' color={green[500]} className=''>{'$30'}</Typography> {/*TODO product price*/}
                        <p className=' ml-3'>x30</p> {/*TODO product quantity*/}
                    </div>
            </div>
        </Paper>
    )
}

export default OrderProductCard
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Img from '@/assets/testProductImg.jpg'
import '@/css/Color.scss'

import {Avatar } from '@material-tailwind/react'
import { Paper , Typography } from '@mui/material'

function Shop() {
    const {id} = useParams()

    const [shopName , setShopName] = useState("我是賣家")
    

    return (
        <div className=' p-20'>
            <Paper className=' bg2 overflow-hidden' elevation={5}>
                <div className=' relative'>
                    <div className=' absolute overflow-hidden w-full h-56'>
                        <img src={Img} className=' object-cover w-full h-full' alt="shop_background" />
                    </div>
                    <div className=' pl-5 pt-40'>
                        <Avatar className=' border2' src={Img} size='xxl'></Avatar>
                    </div>
                </div>
                <div className=' p-5'>
                    <Typography variant='h4'>{shopName}</Typography>
                </div>
            </Paper>
        </div>
    )
}

export default Shop
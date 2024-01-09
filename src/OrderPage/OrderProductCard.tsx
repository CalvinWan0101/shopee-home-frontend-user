import React from 'react'

import { Paper , Typography } from '@mui/material'
import { green } from '@mui/material/colors'

function OrderProductCard(props:{name:string , price : number , quantity : number , image : string}) {
    return (
        <Paper className='bg2 flex p-1 items-center'>
            <img className=" rounded-md h-20 aspect-square" alt="ProductImg" src={props.image}></img>
            <div className=' flex mx-4 w-full'>
                    <div className=' w-5/6 flex items-center overflow-hidden'>
                        <Typography variant='h5'><p className="line-clamp-2">{props.name}</p></Typography>
                    </div>
                    <div className=' w-1/6 flex flex-col items-end justify-center'>
                        <Typography variant='h5' color={green[500]} className=''>{`$${props.price}`}</Typography>
                        <p className=' ml-3'>{`x${props.quantity}`}</p>
                    </div>
            </div>
        </Paper>
    )
}

export default OrderProductCard
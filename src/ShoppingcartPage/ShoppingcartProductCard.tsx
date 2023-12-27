import React from 'react';
import { Paper, Checkbox, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';

export function ShoppingcartProductCard(props: { onCheckChange: (checked: boolean) => void; amount: number; onAmountChange: (newAmount: number) => void; productData: Product; }) {

    return (
        <>
            <Paper className='bg2 flex p-1'>
                <Checkbox color='success' checked={props.productData.checked} onChange={(event) => props.onCheckChange(event.target.checked)} />
                <img className=" rounded-md h-24 aspect-square" alt="ProductImg" src={props.productData.Img}></img>
                <div>
                    <div className="overflow-hidden m-1 ml-4 text-xl">
                        <p className="line-clamp-1">
                            {props.productData.productName}
                        </p>
                    </div>
                    <div className=' h-full flex items-center pb-5'>
                        <IconButton onClick={() => props.onAmountChange((props.amount - 1 >= 0) ? props.amount - 1 : 0)} color='success'>
                            <RemoveIcon />
                        </IconButton>
                        <p>{props.amount}</p>
                        <IconButton onClick={() => props.onAmountChange(props.amount + 1)} color='success'>
                            <AddIcon />
                        </IconButton>
                        <Typography variant='h6' color={green[500]} className=''>{'$' + props.productData.price}</Typography>
                    </div>
                </div>
            </Paper>
        </>
    );
}

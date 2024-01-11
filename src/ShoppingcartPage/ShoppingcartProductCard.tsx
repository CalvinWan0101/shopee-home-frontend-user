import React, { useEffect, useState } from 'react';

import { shoppingcartStore, useShoppingcartStore } from './ShoppingcartStore';
import Img from '@/assets/testProductImg.jpg'

import { Paper, Checkbox, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';

export function ShoppingcartProductCard(props: {shopId : string ,  id : string }) {

    const {
        shopList , setShopList ,
        shopCheckList , setShopCheckList ,
    } = useShoppingcartStore<shoppingcartStore>((state) => state)

    useEffect(() => {
        if (shopList[findShopIndex()].products[findProductIndex()].quantity > shopList[findShopIndex()].products[findProductIndex()].quantityLimit){
            const newShopList = [...shopList]
            newShopList[findShopIndex()].products[findProductIndex()].quantity = shopList[findShopIndex()].products[findProductIndex()].quantityLimit
            setShopList(newShopList)
        }
    } , [shopList])

    function findShopIndex(){
        return shopList.findIndex((value) => value.id === props.shopId )
    }

    function findProductIndex(){
        return shopList[findShopIndex()].products.findIndex((value) => value.id === props.id)
    }

    function handleClick(){
        const newShopCheckList = [...shopCheckList]
        for(let i = 0 ; i < newShopCheckList.length ; i++){
            if (i === findShopIndex()){
                newShopCheckList[i].productChecked[findProductIndex()] = !newShopCheckList[i].productChecked[findProductIndex()]
            }
            else{
                for(let j = 0 ; j < newShopCheckList[i].productChecked.length ; j++){
                    newShopCheckList[i].productChecked[j] = false
                }
            }
        }
        setShopCheckList(newShopCheckList)
    }

    function handleAdd(){
        const newShopList = [...shopList]
        newShopList[findShopIndex()].products[findProductIndex()].quantity += 1
        setShopList(newShopList)
    }

    function handleSub(){
        const newShopList = [...shopList]
        const newShopCheckList = [...shopCheckList]
        newShopList[findShopIndex()].products[findProductIndex()].quantity -= 1
        if (newShopList[findShopIndex()].products[findProductIndex()].quantity <= 0){
            if (newShopList[findShopIndex()].products.length === 1){
                newShopCheckList.splice(findShopIndex() , 1)
                newShopList.splice(findShopIndex() , 1)
            }
            else{
                newShopCheckList[findShopIndex()].productChecked.splice(findProductIndex() , 1)
                newShopList[findShopIndex()].products.splice(findProductIndex() , 1)
            }
        }
        setShopCheckList(newShopCheckList)
        setShopList(newShopList)
    }

    return (
        <>
            <Paper className='bg2 flex p-1'>
                <Checkbox checked={shopCheckList[findShopIndex()].productChecked[findProductIndex()]} color='success' onClick={handleClick}/>
                <img className=" rounded-md h-24 aspect-square" alt="ProductImg" src={shopList[findShopIndex()].products[findProductIndex()].image}/> {/*TODO product image */}
                <div>
                    <div className="overflow-hidden m-1 ml-4 text-xl">
                        <p className="line-clamp-1">
                            {shopList[findShopIndex()].products[findProductIndex()].name}
                        </p>
                    </div>
                    <div className=' h-full flex items-center pb-5'>
                        <IconButton onClick={handleSub} color='success'>
                            <RemoveIcon />
                        </IconButton>
                        <p>{shopList[findShopIndex()].products[findProductIndex()].quantity}</p>
                        <IconButton onClick={handleAdd} color='success' disabled={(shopList[findShopIndex()].products[findProductIndex()].quantity === shopList[findShopIndex()].products[findProductIndex()].quantityLimit)}>
                            <AddIcon />
                        </IconButton>
                        <Typography variant='h6' color={green[500]} className=''>{'$' + shopList[findShopIndex()].products[findProductIndex()].price}</Typography>
                    </div>
                </div>
            </Paper>
        </>
    );
}

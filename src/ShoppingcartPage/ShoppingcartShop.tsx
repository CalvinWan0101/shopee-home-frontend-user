import React, { useEffect, useState } from 'react';

import { ShoppingcartProductCard } from './ShoppingcartProductCard.tsx';
import { shoppingcartStore, useShoppingcartStore } from './ShoppingcartStore';
import { ProductInShoppingcart } from './ShoppingcartDataInterface.ts';

import { Checkbox, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export function ShoppingcartShop(props: { id : string }) {

    const {
        shopList , setShopList ,
        shopCheckList , setShopCheckList , 
    } = useShoppingcartStore<shoppingcartStore>((state) => state)

    const isGreen = () => shopCheckList[findShopIndex()].productChecked.some((value) => value === true)
    const isIndeterminate = () => !shopCheckList[findShopIndex()].productChecked.every((value , _ , array) => value === array[0])
    const isChecked = () => shopCheckList[findShopIndex()].productChecked.every((value) => value === true)

    const findShopIndex = () => shopList.findIndex((shop) => shop.id === props.id)

    function handleClick(){
        const newShopCheckList = [...shopCheckList]
        const checked = isChecked()
        for(let i = 0 ; i < newShopCheckList.length ; i++){
            for(let j = 0 ; j < newShopCheckList[i].productChecked.length ; j++){
                if (i === findShopIndex() && checked === false){
                    newShopCheckList[i].productChecked[j] = true
                }
                else{
                    newShopCheckList[i].productChecked[j] = false
                }
            }
        }
        setShopCheckList(newShopCheckList)
    }

    return (
        <>
            <div className=' flex items-center my-3'>
                <Checkbox color='success' checked={isChecked()} onClick={handleClick}
                    indeterminate={isIndeterminate()}/>
                <Typography variant='h5'
                    color={isGreen() ? green[500] : "default"}>
                    {shopList[findShopIndex()].name}
                </Typography>
            </div>
            <div>
                {shopList[findShopIndex()].products.map((product) => (
                    <div key={product.id} className=' mb-4'>
                        <ShoppingcartProductCard shopId={props.id} id={product.id}/>
                    </div>
                ))}
            </div>
        </>
    );
}

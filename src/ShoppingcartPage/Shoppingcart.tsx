import React, { useEffect, useState } from 'react'


import ProductImg from '/src/assets/testProductImg.jpg'
import testData from './response.json'
import {ShopInShoppingcart , ProductInShoppingcart , ShopChecked} from './ShoppingcartDataInterface.ts'
import '@/css/Color.scss'
import { ShoppingcartShop } from './ShoppingcartShop.tsx'
import { shoppingcartStore , useShoppingcartStore } from './ShoppingcartStore.ts'

import {Typography} from '@mui/material'
import { green } from '@mui/material/colors';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Button } from '@material-tailwind/react'

function Shoppingcart() {

    const {
        shopList , setShopList ,
        shopCheckList , setShopCheckList,
    } = useShoppingcartStore<shoppingcartStore>((state) => state)

    useEffect(() => {
        const shopCheckList : ShopChecked[] = []
        let productCheckList : boolean[] = []
        setShopList(testData as ShopInShoppingcart[])
        testData.forEach(shop => {
            productCheckList = []
            shop.products.forEach(product => {
                productCheckList.push(false)
            })
            shopCheckList.push({
                checked : false,
                productChecked : productCheckList
            })
        });
        setShopCheckList(shopCheckList)
    } , [])

    function price(){
        let price = 0
        for(let i = 0 ; i < shopList.length ; i++){
            for(let j = 0 ; j < shopList[i].products.length ; j++){
                if (shopCheckList[i].productChecked[j] === true){
                    price += shopList[i].products[j].price * shopList[i].products[j].quantity
                }
            }
        }
        return price
    }

    return (
        <div style={{paddingBottom: '5rem'}}>
            <div className=' flex flex-col items-center justify-center'>
                {shopList.map((shop) => (
                    <div key={shop.id} className=' w-3/5'>
                        <ShoppingcartShop id={shop.id}/>
                    </div>
                ))}
            </div>
            <footer className="bg2 p-4 fixed bottom-0 w-full flex justify-end">
                <div className="container flex items-center justify-end">
                    <Typography variant='h3' mr={5} color={green[500]}>{'$' + price()}</Typography>
                    <Button color='green' disabled={price() == 0 ? true:false} className=' flex items-center w-60'>
                        <PointOfSaleIcon fontSize='large' className=' ml-auto text-white'></PointOfSaleIcon>
                        <div className=' ml-1 mr-auto text-xl text-white'>
                            結帳
                        </div>
                    </Button>
                </div>
            </footer>
        </div>

    )
}

export default Shoppingcart
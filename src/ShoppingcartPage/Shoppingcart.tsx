import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import ProductImg from '/src/assets/testProductImg.jpg'
import testData from './response.json'
import {ShopInShoppingcart , ProductInShoppingcart , ShopChecked, shoppingCart} from './ShoppingcartDataInterface.ts'
import '@/css/Color.scss'
import { ShoppingcartShop } from './ShoppingcartShop.tsx'
import { shoppingcartStore , useShoppingcartStore } from './ShoppingcartStore.ts'
import {Login , useLoginStore } from '../LoginState.ts'
import { IOrderCreate , useOrderCreateStore } from '../OrderPage/OrderCreateStore.ts'

import {Typography} from '@mui/material'
import { green } from '@mui/material/colors';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Button } from '@material-tailwind/react'
import { baseURL } from '../APIconfig.ts'
import { useNavigate } from 'react-router-dom'
import { error } from 'console'
import { stat } from 'fs'
import Product from '../ProductPage/Product.tsx'

function Shoppingcart() {

    const navigate = useNavigate()

    const {LoginState , User} = useLoginStore<Login>((state) => state)

    const {
        shopList , setShopList ,
        shopCheckList , setShopCheckList,
    } = useShoppingcartStore<shoppingcartStore>((state) => state)

    const {setProductList} = useOrderCreateStore<IOrderCreate>((state) => state)

    const refShopList = useRef(shopList)

    useEffect(() => {
        let isGetDataSuccess = false
        if (LoginState){
            const newShopCheckList : ShopChecked[] = []
            let productCheckList : boolean[] = []
            axios
            .get<shoppingCart | "">(`${baseURL}shopping_cart/${User.id}`)
            .then((response) => {
                console.log(response.data)
                if (response.data != ""){
                    response.data.shops.forEach(shop => {
                        productCheckList = []
                        shop.products.forEach(product => {
                            productCheckList.push(false)
                        })
                        newShopCheckList.push({
                            productChecked : productCheckList
                        })
                    });
                    setShopList(response.data.shops)
                    setShopCheckList(newShopCheckList)
                }
                else{
                    setShopList([])
                    setShopCheckList([])
                }
                isGetDataSuccess = true
            })
            .catch((error) => {
                console.log(error)
            });
        }
        else{
            navigate('/login')
        }
        return () => {
            if (isGetDataSuccess){
                axios
                .put(`${baseURL}shopping_cart/${User.id}` , {
                    shops : refShopList.current
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    } , [])

    useEffect(() => {
        refShopList.current = shopList
    } , [shopList])

    function handleCheckout(){
        shopList.forEach((shop , shopIndex) => {
            if (shopCheckList[shopIndex].productChecked.some((value) => value === true)){
                setProductList(shop.products.filter((_ , productIndex) => shopCheckList[shopIndex].productChecked[productIndex] == true) , shop.id)
            }
        });
        navigate('/order/create')
    }

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
                {(shopList.length === 0) &&
                    <Typography mt={2} variant='h4'>
                        購物車裡比開發者的錢包還要空 QAQ
                    </Typography>
                }
            </div>
            <footer className="bg2 p-4 fixed bottom-0 w-full flex justify-end">
                <div className="container flex items-center justify-end">
                    <Typography variant='h3' mr={5} color={green[500]}>{'$' + price()}</Typography>
                    <Button color='green' disabled={price() == 0 ? true:false} className=' flex items-center w-60'
                        onClick={handleCheckout}>
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
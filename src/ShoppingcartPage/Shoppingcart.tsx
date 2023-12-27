import React, { useState } from 'react'


import ProductImg from '/src/assets/testProductImg.jpg'
import ShoppingcartData from '../assets/shoppingcartTestData.json'
import './ShoppingcartDataInterface.ts'
import '@/css/Color.scss'
import { ShoppingcartShop } from './ShoppingcartShop.tsx'

import {Typography} from '@mui/material'
import { green } from '@mui/material/colors';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Button } from '@material-tailwind/react'
import { assert } from 'console'

function Shoppingcart() {

    const [shopList , setShopList] = useState(ShoppingcartData.ShopList);
    const [checked , setChecked] = useState(Array.from({length:ShoppingcartData.ShopList.length} , (_ , index) => ShoppingcartData.ShopList[index].productList.reduce((accumulator, currentValue) => accumulator && currentValue.checked , true)))

    function HandleDataChange(newShopData:Shop , ShopIndex:number){
        const newShopList = [...shopList]
        newShopList[ShopIndex] = newShopData
        //無product時把shop一併刪除
        if (newShopList[ShopIndex].productList.length == 0){
            newShopList.splice(ShopIndex , 1)
            setChecked(Array.from({length:newShopList.length} , (_ , index) => newShopList[index].productList.reduce((accumulator, currentValue) => accumulator && currentValue.checked , true)))
        }
        //當shop內有一個product有checked時，將其他shop設成false
        else if (newShopList[ShopIndex].productList.reduce((accumulator, currentValue) => accumulator || currentValue.checked , false)){
            for (let i = 0 ; i < newShopList.length ; i++){
                if (i != ShopIndex){
                    newShopList[i].productList.forEach((value) => value.checked = false)
                }
            }
        }

        setChecked(Array.from({length:newShopList.length} , (_ , index) => index == ShopIndex ? newShopList[ShopIndex].productList.reduce((accumulator, currentValue) => accumulator && currentValue.checked , true) : false))
        setShopList(newShopList)
    }

    function HandleShopClick(shopIndex :number){
        const newChecked = [...checked]
        newChecked[shopIndex] = !checked[shopIndex]
        setChecked(newChecked)
    }

    function Price(){
        let price:number = 0
        shopList.forEach((shop) => (shop.productList.forEach((product) => (price += product.checked ? product.amount * product.price : 0))))
        return price
    }

    return (
        <div style={{paddingBottom: '5rem'}}>
            <div className=' flex flex-col items-center justify-center'>
                {shopList.map((shop , shopIndex) => (
                    <div key={shopIndex} className=' w-3/5'>
                        <ShoppingcartShop checked={checked[shopIndex]} onClick={() => {HandleShopClick(shopIndex)}} shopData={shop} onDataChange={(ShopData) => HandleDataChange(ShopData , shopIndex)}/>
                    </div>
                ))}
            </div>
            <footer className="bg2 p-4 fixed bottom-0 w-full flex justify-end">
                <div className="container flex items-center justify-end">
                    <Typography variant='h3' mr={5} color={green[500]}>{'$' + Price()}</Typography>
                    <Button color='green' disabled={Price() == 0 ? true:false} className=' flex items-center w-60'>
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
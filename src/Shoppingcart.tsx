import React, { useState } from 'react'


import ProductImg from '/src/assets/testProductImg.jpg'
import ShoppingcartData from './assets/shoppingcartTestData.json'
import './ShoppingcartInterface'
import './css/Color.scss'

import {Paper , Checkbox , IconButton , FormControlLabel  , Typography} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { green } from '@mui/material/colors';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Button } from '@material-tailwind/react'

function Shoppingcart() {

    const [shopList , setShopList] = useState(ShoppingcartData.ShopList);
    const [checked , setChecked] = useState(Array.from({length:ShoppingcartData.ShopList.length} , (_ , index) => ShoppingcartData.ShopList[index].productList.reduce((accumulator, currentValue) => accumulator && currentValue.checked , true)))

    function HandleDataChange(newShopData:Shop , ShopIndex:number){
        const newShopList = [...shopList]
        newShopList[ShopIndex] = newShopData
        if (newShopList[ShopIndex].productList.length == 0){
            newShopList.splice(ShopIndex , 1)
            setChecked(Array.from({length:newShopList.length} , (_ , index) => newShopList[index].productList.reduce((accumulator, currentValue) => accumulator && currentValue.checked , true)))
        }
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

    function ProductCard(props:{onCheckChange:(checked:boolean) => void , amount:number , onAmountChange:(newAmount:number) => void , productData:Product}){

        return(
            <>
                <Paper className='bg2 flex p-1'>
                    <Checkbox color='success' checked={props.productData.checked} onChange={(event) => props.onCheckChange(event.target.checked)}/>
                    <img className=" rounded-md h-24 aspect-square" alt="ProductImg" src={props.productData.Img}></img>
                    <div>
                        <div className="overflow-hidden m-1 text-xl">
                            <p className="line-clamp-1">
                                {props.productData.productName}
                            </p>
                        </div>
                        <div className=' h-full flex items-center pb-5'>
                            <IconButton onClick={() => props.onAmountChange(props.amount + 1)} color='success'>
                                <AddIcon />
                            </IconButton>
                            <p>{props.amount}</p>
                            <IconButton onClick={() => props.onAmountChange((props.amount - 1 >= 0)? props.amount - 1 : 0)} color='success'>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography variant='h6' color={green[500]} className=''>{'$' + props.productData.price}</Typography>
                        </div>
                    </div>
                </Paper>
            </>
        )
    }

    function Shop(props:{checked:boolean , onClick:() => void , shopData:Shop , onDataChange:(ShopData:Shop) => void}){
        
        function HandleAmountChange(productIndex:number , amount:number){
            const newShopData = props.shopData
            newShopData.productList[productIndex].amount = amount
            if (amount == 0){
                newShopData.productList.splice(productIndex , 1)
            }
            props.onDataChange(newShopData)
        }

        function HandleProductCheckedChange(productIndex:number , checked:boolean){
            const newShopData = props.shopData
            newShopData.productList[productIndex].checked = checked
            props.onDataChange(newShopData)
        }

        function checkedChange(checked:boolean){
            const newShopData = props.shopData
            newShopData.productList.forEach((value) => (value.checked = checked))
            props.onDataChange(newShopData)
        }

        return(
            <>
                <div className=' flex items-center my-3'>
                    <Checkbox color='success' checked={props.checked} onClick={props.onClick} 
                    indeterminate={! props.shopData.productList.every((value, _, array) => value.checked === array[0].checked)} 
                    onChange={(event) => checkedChange(event.target.checked)} />
                    <Typography variant='h5' 
                    color={props.shopData.productList.reduce((accumulator, currentValue) => accumulator || currentValue.checked , false)? green[500] : "default"}>
                        {props.shopData.shopName}
                    </Typography>
                </div>
                <div>
                    {props.shopData.productList.map((product , productIndex) => (
                        <div key={productIndex} className=' mb-2'>
                            <ProductCard onCheckChange={(checked)=>{HandleProductCheckedChange(productIndex , checked)}} 
                            amount={product.amount} onAmountChange={(newAmount) => HandleAmountChange(productIndex , newAmount)} 
                            productData={product}/>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div style={{paddingBottom: '5rem'}}>
            <div className=' flex flex-col items-center justify-center'>
                {shopList.map((shop , shopIndex) => (
                    <div key={shopIndex} className=' w-3/5'>
                        <Shop checked={checked[shopIndex]} onClick={() => {HandleShopClick(shopIndex)}} shopData={shop} onDataChange={(ShopData) => HandleDataChange(ShopData , shopIndex)}/>
                    </div>
                ))}
            </div>
            <footer className="bg2 p-4 fixed bottom-0 w-full">
                <div className="container mx-auto flex items-center justify-end">
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
import React from 'react';
import { ShoppingcartProductCard } from './ShoppingcartProductCard.tsx';
import { Checkbox, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export function ShoppingcartShop(props: { checked: boolean; onClick: () => void; shopData: Shop; onDataChange: (ShopData: Shop) => void; }) {

    function HandleAmountChange(productIndex: number, amount: number) {
        const newShopData = props.shopData;
        newShopData.productList[productIndex].amount = amount;
        if (amount == 0) {
            newShopData.productList.splice(productIndex, 1);
        }
        props.onDataChange(newShopData);
    }

    function HandleProductCheckedChange(productIndex: number, checked: boolean) {
        const newShopData = props.shopData;
        newShopData.productList[productIndex].checked = checked;
        props.onDataChange(newShopData);
    }

    function checkedChange(checked: boolean) {
        const newShopData = props.shopData;
        newShopData.productList.forEach((value) => (value.checked = checked));
        props.onDataChange(newShopData);
    }

    return (
        <>
            <div className=' flex items-center my-3'>
                <Checkbox color='success' checked={props.checked} onClick={props.onClick}
                    indeterminate={!props.shopData.productList.every((value, _, array) => value.checked === array[0].checked)}
                    onChange={(event) => checkedChange(event.target.checked)} />
                <Typography variant='h5'
                    color={props.shopData.productList.reduce((accumulator, currentValue) => accumulator || currentValue.checked, false) ? green[500] : "default"}>
                    {props.shopData.shopName}
                </Typography>
            </div>
            <div>
                {props.shopData.productList.map((product, productIndex) => (
                    <div key={productIndex} className=' mb-4'>
                        <ShoppingcartProductCard onCheckChange={(checked) => { HandleProductCheckedChange(productIndex, checked); }}
                            amount={product.amount} onAmountChange={(newAmount) => HandleAmountChange(productIndex, newAmount)}
                            productData={product} />
                    </div>
                ))}
            </div>
        </>
    );
}

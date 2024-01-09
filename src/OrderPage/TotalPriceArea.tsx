
import { IOrderCreate , useOrderCreateStore } from "./OrderCreateStore"
import { Login , useLoginStore } from "../LoginState"
import { ProductInOrderSend , OrderSend } from "./OrderInterface"

import { Grid , Typography } from "@mui/material"
import { Button } from "@material-tailwind/react"
import { red } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../APIconfig"

function TotalPriceArea(){
    const titleArea = 9
    const priceArea = 3

    const navigate = useNavigate()

    const {productList , discount , selectAddress , selectCouponId} = useOrderCreateStore<IOrderCreate>((state) => state)
    const {User , LoginState} = useLoginStore<Login>((state) => state)

    const price = () => {
        let p = 0
        productList.forEach(product => {
            p += product.quantity * product.price
        });
        return p
    }

    function handleBuy(){
        if (LoginState){
            const sendProductList : ProductInOrderSend[] = []
            productList.forEach(element => {
                sendProductList.push({
                    id : element.id,
                    quantity : element.quantity
                })
            });

            axios
            .post(baseURL + 'order' , {
                userId : User.id,
                address : selectAddress,
                couponId : (selectCouponId === "") ? null : selectCouponId,
                products : sendProductList
            })
            .then((response) => {
                console.log(response)
                navigate('/order')
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else{
            navigate('/login')
        }
    }

    return(
        <>
            <div className=' flex justify-center w-full'>
                <Grid container width={"40%"}>
                    <Grid item xs={titleArea}>
                        <Typography variant='h5' color={'black'}>
                            Price:
                        </Typography>
                    </Grid>
                    <Grid item xs={priceArea}>
                        <Typography variant='h5' color={'green'} pl={1}> {/*TODO price*/}
                            {`$${price()}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={titleArea}>
                        <Typography variant='h5' color={'black'}>
                            Freight:
                        </Typography>
                    </Grid>
                    <Grid item xs={priceArea}>
                        <Typography variant='h5' color={'green'} pl={1}>
                            $60
                        </Typography>
                    </Grid>
                    {discount != 0 &&
                    <Grid item xs={titleArea}>
                        <Typography variant='h5' color={'black'}>
                            Coupon:
                        </Typography>
                    </Grid>
                    }
                    {discount != 0 &&
                    <Grid item xs={priceArea}>
                        <Typography variant='h5' color={red[900]}> {/*TODO coupon discount*/}
                            {`-$${discount}`}
                        </Typography>
                    </Grid>
                    }
                    <div className=' w-full h-[1px] bg-gray-600 my-1'/>
                    <Grid item xs={titleArea}>
                        <Typography variant='h5' color={'black'}>
                            Total:
                        </Typography>
                    </Grid>
                    <Grid item xs={priceArea}>
                        <Typography variant='h5' color={'green'} pl={1}> {/*TODO total price*/}
                            {`$${price() - discount + 60}`}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div className=' flex justify-center w-full mt-20'>
                <Button className=' w-3/5 animate-bounce' color='green' onClick={handleBuy}>
                    <Typography variant='h1'> {/*TODO Buy (create order)*/}
                        {'Buy'}
                    </Typography>
                </Button>
            </div>
        </>
    )
}

export default TotalPriceArea
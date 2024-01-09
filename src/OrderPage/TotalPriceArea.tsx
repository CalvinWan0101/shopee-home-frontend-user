
import { IOrderCreate , useOrderCreateStore } from "./OrderCreateStore"

import { Grid , Typography } from "@mui/material"
import { Button } from "@material-tailwind/react"
import { red } from "@mui/material/colors"

function TotalPriceArea(){
    const titleArea = 9
    const priceArea = 3
    const {productList , discount} = useOrderCreateStore<IOrderCreate>((state) => state)

    const price = () => {
        let p = 0
        productList.forEach(product => {
            p += product.quantity * product.price
        });
        return p
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
                <Button className=' w-3/5 animate-bounce' color='green'>
                    <Typography variant='h1'> {/*TODO Buy (create order)*/}
                        {'Buy'}
                    </Typography>
                </Button>
            </div>
        </>
    )
}

export default TotalPriceArea
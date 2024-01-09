

import { IOrderCreate , useOrderCreateStore } from "./OrderCreateStore";

import { Typography , Grid } from "@mui/material";
import { List , ListItem , ListItemPrefix} from "@material-tailwind/react";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function CouponList(){ //TODO Coupon ALL

    const {
        selectCouponId , setSelectCouponId , 
        discount , setDiscount ,
        productList , 
        seasoningCouponList , 
        shippingCouponList ,
    } = useOrderCreateStore<IOrderCreate>((state) => state)

    function handleSelectCoupon(id : string){
        if (selectCouponId === id){
            setSelectCouponId("")
            setDiscount(0)
        }
        else{
            setSelectCouponId(id)
        }
    }

    const price = () => {
        let p = 0
        productList.forEach(product => {
            p += product.quantity * product.price
        });
        return p
    }
    
    return(
        <Grid container>
            <Grid item xs={6} p={2}>
                <Typography variant='h5' color={'green'}>免運券</Typography>
                <List>
                    {shippingCouponList.map((item , index) => (
                        <ListItem key={index} style={(item.id === selectCouponId) ? {color:'green'} : {}}
                        onClick={() => {setDiscount(60); handleSelectCoupon(item.id);}} className=' bg2' disabled={(price() < item.shippingLimit)}>
                            <ListItemPrefix>
                                <LocalActivityIcon/>
                            </ListItemPrefix>
                            {`單筆滿$${item.shippingLimit}免運費`}
                        </ListItem>
                    ))}
                    {shippingCouponList.length === 0 &&
                        <Typography variant="h6" color={'gray'}>
                            無
                        </Typography>
                    }
                </List>
            </Grid>
            <Grid item xs={6} p={2}>
                <Typography variant='h5' color={'green'}>折價券</Typography>
                <List>
                    {seasoningCouponList.map((item , index) => (
                        <ListItem key={index} style={(item.id === selectCouponId) ? {color:'green'} : {}}
                        onClick={() => {setDiscount(Math.ceil(price() - item.rate * price()));  handleSelectCoupon(item.id);}} className=' bg2'>
                            <ListItemPrefix>
                                <LocalActivityIcon/>
                            </ListItemPrefix>
                            {`單筆訂單打${item.rate.toString().split(".")[1]}折`}
                        </ListItem>
                    ))}
                    {seasoningCouponList.length === 0 &&
                        <Typography variant="h6" color={'gray'}>
                            無
                        </Typography>
                    }
                </List>
            </Grid>
        </Grid>
    )
}

export default CouponList
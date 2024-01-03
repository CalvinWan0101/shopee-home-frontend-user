import React, { useEffect, useState } from 'react'


import { Grid , Typography , Paper , Card , CardActionArea } from '@mui/material';
import { green , lime } from '@mui/material/colors';
import axios from 'axios';
import { baseURL } from '../APIconfig';
import { error } from 'console';

function ProductPreview(props:{id: string}) {

    const [name , setName] = useState("")
    const [price , setPrice] = useState(100000)
    const [sales , setSales] = useState(0)
    const [image , setImage] = useState("")

    useEffect(() => {
        axios
        .get<ProductPreview>(baseURL + 'product/preview/' + props.id)
        .then((response) => {
            setName(response.data.name)
            setPrice(response.data.finalPrice)
            setSales(response.data.sales)
            setImage(response.data.image)
        })
        .catch((error) => {
            console.log(error)
        })
    } , [])

    function NumberToString(inputNumber : number){
        if (inputNumber >= 1000000){
            return (inputNumber/1000000).toFixed(1) + "M"
        }
        else if(inputNumber >= 1000){
            return (inputNumber / 1000).toFixed(1) + "k"
        }
        else{
            return inputNumber.toString();
        }
    }

    function addCommasToNumber(number:number) {
        let numString = number.toString();
        numString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numString;
    }

    return (
        <>
            <Card sx={{ margin:'auto' , maxWidth:180 , flexGrow: 1}} className='bg2' elevation={5}>
                <CardActionArea sx={{p:1}}>
                    <Grid container sx={{p:0.5}}>
                        <Grid item xs={12}>
                            <div className=' rounded-md relative w-full h-40 overflow-hidden'>
                                <img className=" rounded-md w-full h-full object-cover" alt="ProductPreview" src={image}></img>
                            </div>
                        </Grid>
                        <Grid item sx={{height: "auto"}}>
                            <div className="overflow-hidden m-1">
                                <p className="line-clamp-2">
                                    {name}
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs>
                                <Typography variant='subtitle2' align='left' color={green[500]} noWrap>
                                    { "$" + addCommasToNumber(price)}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='subtitle2' align='right' color={"#A7A7A7"} noWrap>
                                    {"已售出" + NumberToString(sales)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </>
    )
}

export default ProductPreview
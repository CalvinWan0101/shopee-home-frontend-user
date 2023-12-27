import React from 'react'


import { Grid , Typography , Paper , Card , CardActionArea } from '@mui/material';
import { green , lime } from '@mui/material/colors';

function ProductPreview(props:{img: string, header: string, price: number, id: string, sellCount: number}) {

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
                            <img className=" rounded-md" alt="ProductPreview" src={props.img}></img> 
                        </Grid>
                        <Grid item sx={{height: "auto"}}>
                            <div className="overflow-hidden m-1">
                                <p className="line-clamp-2">
                                    {props.header}
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs>
                                <Typography variant='subtitle2' align='left' color={green[500]} noWrap>
                                    { "$" + addCommasToNumber(props.price)}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='subtitle2' align='right' color={"#A7A7A7"} noWrap>
                                    {"已售出" + NumberToString(props.sellCount)}
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
//import react
import React from 'react'
import { useState } from 'react';
import { Params, useParams , Link } from 'react-router-dom'

//import other
import ProductImg from './assets/testProductImg.jpg'
import '/src/css/Color.scss'
import { Login , useLoginStore } from './LoginState'

//import material UI
import { Card, Grid, Paper , Typography , Chip , Avatar , ButtonBase} from '@mui/material';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import ElectricRickshawTwoToneIcon from '@mui/icons-material/ElectricRickshawTwoTone';
import { 
    Carousel,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Rating,
    Button,
} from "@material-tailwind/react";
import { green, lime } from '@mui/material/colors';

function Product() {

    const {id} = useParams(); // 取得產品ID

    function productInfo(time:number){
        let string:string = '';
        for(let i = 0 ; i < time ; i++){
            string += "圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n";
        }
        console.log(id);
        return string;
    }

    const {LoginState , setLoginState} = useLoginStore<Login>( (state) => state );
    
    function ProductArea(){
        return(
            <Paper sx={{m: 10, p: 2}} className='bg2'>
                <Grid container spacing={2}>
                    <Grid item xs={3.5}>
                        <Carousel loop className=' rounded-3xl h-fit dark-border'>
                            <img src={ProductImg} alt="image1" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image2" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image3" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image4" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image5" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image6" className=' h-full w-full object-cover'/>
                        </Carousel>
                    </Grid>
                    <Grid item xs={8.5}>
                        <div className=' px-10 h-full flex flex-col'>
                            <Typography variant='h5' sx={{mb:2}}>
                                全新手機 M11ultra 安卓智能手機 6.1寸 inch 4G/5G手機 8 128G 雙卡雙模
                            </Typography>
                            <Rating unratedColor='light-green' ratedColor='light-green' className=' mb-1'/>
                            <div className=' p-2'>
                                <Typography variant='h4' color={'gray'} className=' line-through'>
                                    $30
                                </Typography>
                                <Typography variant='h2' color={green[500]} className=''>
                                    $29
                                </Typography>
                            </div>
                            <Grid container className=' mt-auto mb-1'>
                                <Grid item xs={6} className=' pl-2 pr-2'>
                                    <Button color='light-green' className='flex items-center w-full'>
                                        <AddShoppingCartTwoToneIcon fontSize='large' className=' ml-auto text-white'></AddShoppingCartTwoToneIcon>
                                        <div className=' ml-1 mr-auto text-xl text-white'>
                                            加入購物車
                                        </div>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className=' pl-2 pr-2'>
                                    <Button color='green' className=' flex items-center w-full'>
                                        <ElectricRickshawTwoToneIcon fontSize='large' className=' ml-auto text-white'></ElectricRickshawTwoToneIcon>
                                        <div className=' ml-1 mr-auto text-xl text-white'>
                                            立即購買
                                        </div>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    function ShopArea(){
        return(
            <Paper sx={{m: 10, p: 2}} className='bg2'>
                <Link to={'/'}  className='flex text-center items-center'>
                    <Avatar src={ProductImg}></Avatar>
                    <span className=' flex-nowrap text-2xl ml-2'>我是賣家</span>
                </Link>
            </Paper>
        )
    }

    function ProductInfoArea(){

        const [open, setOpen] = useState(0);

        const handleOpen = (value:number) => setOpen(open === value ? 0 : value);

        function Icon(props:{ id:number, open:number }) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`${props.id === props.open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            );
        }

        return(
            <Paper sx={{m: 10, p: 2}} className='bg2'>
                <Accordion  open={open === 1} icon={ <Icon id={1} open={open}/> }>
                    <AccordionHeader onClick={() => handleOpen(1)}>商品資訊</AccordionHeader>
                    <AccordionBody>
                        <Typography variant='subtitle1' className=' whitespace-pre'>
                            {productInfo(50)}
                        </Typography>
                    </AccordionBody>
                </Accordion>
            </Paper>
        )
    }

    return (
        <>
            <ProductArea/>
            <ShopArea/>
            <ProductInfoArea/>
        </>
    )
}
    export default Product  
import React from 'react'
import { Params, useParams } from 'react-router-dom'
import ProductImg from './assets/testProductImg.jpg'
import { Grid, Paper , Typography } from '@mui/material';
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

function Product() {
    const {id} = useParams();
    let productInfo = (time:number):string => {
        let string:string = '';
        for(let i = 0 ; i < time ; i++){
            string += "圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n";
        }
        return string;
    };

    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }
    
    return (
        <>
            <Paper sx={{m: 7, p: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Carousel loop className=' rounded-3xl h-fit'>
                            <img src={ProductImg} alt="image1" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image2" className=' h-full w-full object-cover'/>
                            <img src={ProductImg} alt="image3" className=' h-full w-full object-cover'/>
                        </Carousel>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='h5'>
                            全新手機 M11ultra 安卓智能手機 6.1寸 inch 4G/5G手機 8 128G 雙卡雙模
                        </Typography>
                        <Rating unratedColor='deep-orange' ratedColor='orange' />
                        <Typography variant='h3' color={"orange"}>
                            $30
                        </Typography>
                        <Grid container>
                            <Grid item xs={6} className=' pl-2 pr-1'>
                                <Button variant='outlined' color='orange' className='flex items-center w-full'>
                                    <AddShoppingCartTwoToneIcon fontSize='large' className=' ml-auto'></AddShoppingCartTwoToneIcon>
                                    <div className=' mr-auto text-xl'>
                                        加入購物車
                                    </div>
                                </Button>
                            </Grid>
                            <Grid item xs={6} className=' pl-1 pr-2'>
                                <Button className=' bg-orange-900 flex items-center w-full'>
                                    <ElectricRickshawTwoToneIcon fontSize='large' className=' ml-auto'></ElectricRickshawTwoToneIcon>
                                    <div className=' mr-auto text-xl'>
                                        立即購買
                                    </div>                                    
                                </Button>
                            </Grid>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{m: 7, p: 2}}>
                
            </Paper>
            <Paper sx={{m: 7, p: 2}}>
                <Accordion  open={open === 1} icon={ <Icon id={1} open={open}/> }>
                    <AccordionHeader onClick={() => handleOpen(1)}>商品資訊</AccordionHeader>
                    <AccordionBody>
                        <Typography variant='subtitle1'>
                            {productInfo(50)}
                        </Typography>
                    </AccordionBody>
                </Accordion>
            </Paper>
        </>
    )
}
    export default Product  
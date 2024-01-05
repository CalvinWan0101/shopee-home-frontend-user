import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import axios from 'axios'

import '@/css/Color.scss'
import ProductPreview from '../ProductPage/ProductPreview.tsx'
import './ShopInterface.ts'
import '@/ProductPage/ProductInterface.ts'

import { Avatar , Tab , Tabs , TabsHeader , TabsBody , TabPanel , List , ListItem , ListItemPrefix , ListItemSuffix } from '@material-tailwind/react'
import { Paper , Typography , Grid} from '@mui/material'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { baseURL } from '../APIconfig.ts'

function Shop() {
    const {id} = useParams()

    const [shopName , setShopName] = useState("")
    const [shopProductCount , setShopProductCount] = useState(0)
    const [shopAverageRate , setShopAverageRate] = useState(0)
    const [shopAvatar , setShopAvatar] = useState("")
    const [shopBackground , setShopBackground] = useState("")
    const [shopProduct , setShopProduct] = useState<ProductInList[]>([])
    const [shopDescription , setShopDescription] = useState("")

    useEffect(() => {
        axios
        .get<Shop>(baseURL + 'shop/' + id )
        .then((response) => {
            setShopName(response.data.name)
            setShopAverageRate(4.5) //TODO add shopAverageRate
            setShopAvatar(response.data.avatar)
            setShopBackground(response.data.background)
            setShopDescription(response.data.description)
        })
        .catch((error) => {
            console.log(error)
        })
    } , [])

    useEffect(() => {
        axios
        .get<ProductInList[]>(baseURL + 'product/name/shop/' + id)
        .then((response) => {
            setShopProduct(response.data)
            setShopProductCount(response.data.length)
        })
        .catch((error) => {
            console.log(error)
        })
    } , [])

    const coupon = Array.from({length: 100}, (_ , index) => ({
        id: index + 1,
        text: `滿 ${(index+1) * 10}$ 免運費`,
        has: (index % 5 == 0)? true : false ,
        isUsed: (index % 4 == 0)?true : false
    }))

    return (
        <div className=' flex justify-center'>
            <Paper sx={{minWidth:"1000px" , maxWidth:"1000px"}} className=' bg2 overflow-hidden' elevation={5}>
                <div className=' relative'>
                    <div className=' absolute overflow-hidden w-full h-56'>
                        <img src={shopBackground} className=' object-cover object-left-top w-full h-full' alt="shop_background" />
                    </div>
                    <div className=' pl-5 pt-40'>
                        <Avatar className=' border2' src={shopAvatar} alt='shopAvatar' size='xxl'></Avatar>
                    </div>
                </div>
                <div className=' p-5 flex items-center flex-wrap'>
                    <div className=' flex items-center'>
                        <Typography variant='h4'>{shopName}</Typography>
                    </div>
                    <div className=' flex items-center whitespace-nowrap'>
                        <div className=' w-[2px] h-8 ml-5 mr-1 bg-gray-500'></div>
                        <Typography variant='h6' color={'gray'}>{"商品數量 : " + shopProductCount}</Typography>
                        <div className=' w-[2px] h-8 ml-5 mr-1 bg-gray-500'></div>
                        <Typography variant='h6' color={'gray'}>{"平均評價 : " + shopAverageRate}</Typography>
                    </div>
                </div>
                <Tabs value="product" className=" bg1">
                    <TabsHeader className='bg3'>
                        <Tab value={"product"}>商品</Tab>
                        <Tab value={"Introduction"}>簡介</Tab>
                        <Tab value={"Coupon"}>優惠券</Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value={"product"}>
                            <ShopProduct/>
                        </TabPanel>
                        <TabPanel value={"Introduction"}>
                            <Typography variant='body1' className=' whitespace-break-spaces'>
                                {shopDescription}
                            </Typography>
                        </TabPanel>
                        <TabPanel value={"Coupon"}>
                            <ShopCoupon/>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </Paper>
        </div>
    )

    function ShopProduct(){
        return(
            <div className=' flex flex-wrap justify-evenly'>
            {shopProduct.map((item) => (
                <div key={item.id} className=' mx-1.5 my-3 '>
                    <Link to={`/Product/${item.id}`}>
                        <ProductPreview id={item.id.toString()}/>
                    </Link>
                </div>
            ))}
            </div>
        )
    }

    function ShopCoupon(){
        return(
            <div>
                <Grid container>
                    <Grid item xs={6} p={2}>
                        <Typography variant='h5' color={'green'}>免運券</Typography>
                        <List>
                            {coupon.map((item , index) => (
                                <ListItem disabled={item.isUsed} className=' bg2' key={index}
                                style={(item.has && !item.isUsed) ? {color:"green"} : {}}>
                                    <ListItemPrefix>
                                        <LocalActivityIcon/>
                                    </ListItemPrefix>
                                    {item.text}
                                    <ListItemSuffix>
                                        {item.has && !item.isUsed && <CheckCircleOutlineIcon/>}
                                    </ListItemSuffix>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={6} p={2}>
                        <Typography variant='h5' color={'green'}>折價券</Typography>
                        <List>
                            {coupon.map((item , index) => (
                                <ListItem disabled={item.isUsed} className=' bg2' key={index}
                                style={(item.has && !item.isUsed) ? {color:"green"} : {}}>
                                    <ListItemPrefix>
                                        <LocalActivityIcon/>
                                    </ListItemPrefix>
                                    {item.text}
                                    <ListItemSuffix>
                                        {item.has && !item.isUsed && <CheckCircleOutlineIcon/>}
                                    </ListItemSuffix>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Shop
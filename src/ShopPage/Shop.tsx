import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'

import Img from '@/assets/testProductImg.jpg'
import defaultBackground from '@/assets/defaultBackground.jpg'
import '@/css/Color.scss'
import ProductPreview from '../ProductPreview.tsx'

import { Avatar , Tab , Tabs , TabsHeader , TabsBody , TabPanel } from '@material-tailwind/react'
import { Paper , Typography } from '@mui/material'

function Shop() {
    const {id} = useParams()

    const [shopName , setShopName] = useState("我是賣家")
    const [shopProductCount , setShopProductCount] = useState(125)
    const [shopAverage , setShopAverage] = useState(4.8)
    
    const data = Array.from({ length: 500 }, (_, index) => ({
        id: index + 1,
        text: `Element ${index + 1}`,
    }));

    return (
        <div className=' flex justify-center'>
            <Paper sx={{minWidth:"1000px" , maxWidth:"1000px"}} className=' bg2 overflow-hidden' elevation={5}>
                <div className=' relative'>
                    <div className=' absolute overflow-hidden w-full h-56'>
                        <img src={defaultBackground} className=' object-cover object-left-top w-full h-full' alt="shop_background" />
                    </div>
                    <div className=' pl-5 pt-40'>
                        <Avatar className=' border2' src={Img} size='xxl'></Avatar>
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
                        <Typography variant='h6' color={'gray'}>{"平均評價 : " + shopAverage}</Typography>
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
                            <div className=' flex flex-wrap justify-evenly'>
                                {data.map((item) => (
                                    <div key={item.id} className=' mx-1.5 my-3 '>
                                        <Link to={`/Product/${item.id}`}>
                                            <ProductPreview img = {Img} header={"全新手機 M11ultra 安卓智能手機 6.1寸 inch 4G/5G手機 8 128G 雙卡雙模"} price={100000 * item.id} id={item.id.toString()} sellCount={111111}/>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel value={"Introduction"} className='whitespace-pre'>
                            {"圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n圖為示意圖，實際出貨為實際下單型號\n減緩衝擊，防止爆屏，精湛工術，有效增強耐用度\n 本商品為特價品,皆為非滿版\n"}
                        </TabPanel>
                        <TabPanel value={"Coupon"}>
                            <div></div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </Paper>
        </div>
    )
}

export default Shop
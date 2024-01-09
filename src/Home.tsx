import React, { useEffect, useState } from 'react'
import ProductPreview from './ProductPage/ProductPreview'
import {DefultProduct} from './img_src.json'
import Pimg from './assets/testProductImg.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { baseURL } from './APIconfig'
import { error } from 'console'

//有時因為快取或其他原因導致側邊介面打不開，本頁註解內容為在主業最下方新增一個跳至修改個人資料的按鈕，環境出錯時測試用，可刪除
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

function Home() {
    // //test
    // const navigate = useNavigate();

    // const handleLoginRedirect = () => {
    //     navigate('/PersionalInformation_confirm');
    // };
    // //test

    const [productList , setProductList] = useState<ProductInList[]>([])

    useEffect(() => {
        axios
        .get<ProductInList[]>(baseURL + 'product/name/all')
        .then((response) => {
            setProductList(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    } , [])

    return (
        
        <div className=' flex flex-wrap justify-evenly'>
            {productList.map((item) => (
                <div key={item.id} className=' mx-1.5 my-3 '>
                    <Link to={`/Product/${item.id}`}>
                        <ProductPreview id={item.id}/>
                    </Link>
                </div>
            ))}

            {/* <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
            修改
            </Button> */}

        </div>
    )
}

export default Home
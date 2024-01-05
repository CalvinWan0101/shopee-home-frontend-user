import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams , Link } from 'react-router-dom'

import { baseURL } from './APIconfig'
import ProductPreview from './ProductPage/ProductPreview'

import {Typography} from '@mui/material'

function Search() {

    const {keyword} = useParams()

    const location = useLocation()

    const [isSearch , setIsSearch] = useState(false)
    const [productList , setProductList] = useState<string[]>([])

    useEffect(() => {
        axios
        .get<string[]>(baseURL + 'product/id/' + keyword)
        .then((respone) => {
            setIsSearch(true)
            setProductList(respone.data)
            console.log(respone.data)
        })
        .catch((error) => {
            setIsSearch(false)
            console.log(error)
        })
    } , [location])

    return (
        <>
            <div className=' flex justify-center'>
                {isSearch ? (
                    <div>
                        <div className=' w-full flex justify-center pt-5'>
                            <Typography variant='h5' color={'black'}>
                                共<span className=' text-green-600'>{productList.length}</span>筆與<span className=' text-green-600'>{'"' + keyword + '"'}</span>相關的搜尋結果
                            </Typography>
                        </div>
                        <div className=' flex flex-wrap justify-evenly'>
                            {productList.map((item) => (
                                <div key={item} className=' mx-1.5 my-3 '>
                                    <Link to={`/Product/${item}`}>
                                        <ProductPreview id={item}/>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ):
                (
                    <div className=' m-5'>
                        <Typography variant='h5' color={'black'}>
                            沒有任何與<span className=' text-red-800'>{'"' + keyword + '"'}</span>相關的搜尋結果
                        </Typography>
                    </div>
                )}
            </div>
        </>
    )
}

export default Search
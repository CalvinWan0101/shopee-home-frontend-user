import React from 'react'
import ProductPreview from './ProductPreview'
import {DefultProduct} from './img_src.json'

function Home() {
    return (
        <div style={{height:'100%', width:'100%'}}>
            <ProductPreview img='down-tw.img.susercontent.com/file/tw-11134207-7qul7-ljjvj01j7ydi7c' header='陳總的賣場 直播銷售 極速行動電源 現貨熱銷多件優惠組' price={1111} id='1' sellCount={2560}/>
        </div>
    )
}

export default Home
import React from 'react'
import ProductPreview from './ProductPreview'
import {DefultProduct} from './img_src.json'
import Pimg from './assets/testProductImg.jpg'
import {Link} from 'react-router-dom'

function Home() {
    const data = Array.from({ length: 500 }, (_, index) => ({
        id: index + 1,
        text: `Element ${index + 1}`,
    }));
    return (
        <div className=' flex flex-wrap'>
            {data.map((item) => (
                <div key={item.id} className=' ml-5 mt-5 hover:animate-pulse'>
                    <Link to={`/Product/${item.id}`}>
                        <ProductPreview img = {Pimg} header={"全新手機 M11ultra 安卓智能手機 6.1寸 inch 4G/5G手機 8 128G 雙卡雙模"} price={1000000 * item.id} id={item.id.toString()} sellCount={111111}/>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Home
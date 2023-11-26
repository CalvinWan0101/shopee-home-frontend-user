import React from 'react'
import ProductPreview from './ProductPreview'
import {DefultProduct} from './img_src.json'
import Pimg from './assets/testProductImg.jpg'

function Home() {
    const data = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        text: `Element ${index + 1}`,
    }));
    return (
        <div className=' flex flex-wrap'>
            {data.map((item) => (
                <div key={item.id} className=' ml-5 mt-5'>
                    <ProductPreview img = {Pimg} header={item.text} price={10 * item.id} id='123' sellCount={1000}/>
                </div>
            ))}
        </div>
    )
}

export default Home
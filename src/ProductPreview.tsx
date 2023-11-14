import React from 'react'
import styles from './ProductPreview.module.scss'

function ProductPreview(props:{img: string, header: string, price: number, id: string, sellCount: number}) {
    return (
        <div className={styles.ProductPreviesWindow}>
            <img src={props.img} alt='product photo'/>
        </div>
    )
}

export default ProductPreview
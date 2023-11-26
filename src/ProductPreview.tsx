import React from 'react'
import styles from './ProductPreview.module.scss'
import { Grid , Typography , Paper , ButtonBase } from '@mui/material';

function ProductPreview(props:{img: string, header: string, price: number, id: string, sellCount: number}) {

    return (
        <>
        <ButtonBase>
            <Paper sx={{p:1 , margin:'auto' , maxWidth:180 , flexGrow: 1}}>
                <Grid container>
                    <Grid item xs={12}>
                        <img className={styles.img} alt="ProductPreview" src={props.img}></img> 
                    </Grid>
                    <Grid item sx={{height: "auto"}}>
                        <div className="overflow-hidden m-1">
                            <p className="line-clamp-2">
                                {props.header}
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs>
                            <Typography variant='subtitle2' align='left' color={"orange"}>
                                { "$" + props.price}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant='subtitle2' align='right' color={"#A7A7A7"}>
                                {"已售出" + props.sellCount}
                            </Typography>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ButtonBase>
        </>
    )
}

export default ProductPreview
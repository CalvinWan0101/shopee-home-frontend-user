import React, { useEffect, useState } from 'react'
import axios, { AxiosDefaults, AxiosResponse } from 'axios';
import "./ProductPage/ProductInterface.ts";
import img1 from './assets/defaultAccount.jpg'
import img2 from './assets/defaultBackground.jpg'
import img3 from './assets/testProductImg.jpg'
import { error } from 'console';

function Test() {

    const [image , setImage] = useState(["" , "" , ""])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const outputstring = e.target?.result as string;
                console.log(outputstring)

                axios
                .post<CreateNewProduct , AxiosResponse<ProductDetail , CreateNewProduct>>("http://localhost:8080/product", 
                {
                    name: "samsung",
                    amount: 81,
                    description: "This is samsung",
                    discountRate: 0.92,
                    discountDate: "2024-08-15",
                    shopId: "1013f7a0-0017-4c21-872f-c014914e6834",
                    images: [
                        outputstring,
                        outputstring,
                        outputstring
                    ],
                    isDeleted: false
                })
                .then((response) => {
                    console.log(response);
                    setImage( [response.data.images[0] , response.data.images[1] , response.data.images[2]] );
                })
                .catch((error) => {
                    console.log(error);
                })
            };
    
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept='image/*' onChange={handleFileChange} />
            {image.map((value , index) => (
                <img src={value} key={index} />
            ))}
        </div>
    )
}

export default Test
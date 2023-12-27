import React, { useState } from 'react'

import '/src/css/Color.scss'

import {Paper} from '@mui/material'

function UserInformation() {

    const [inputImage , setInputImage] = useState<string>("")
    console.log(inputImage)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const base64String = e.target?.result as string;
                setInputImage(base64String);
            };
    
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className=' flex items-center justify-center'>
            <Paper className=' bg2 p-10 m-10'>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <img src={inputImage}/>
            </Paper>
        </div>
    )
}

export default UserInformation
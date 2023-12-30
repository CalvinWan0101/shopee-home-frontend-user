import React, { useState } from 'react';
import '/src/css/Color.scss';
import { Paper, FormControl, FormGroup, FormLabel, TextField, Button } from '@mui/material';

function SignUp() {
    const [inputImage, setInputImage] = useState<string>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className='flex items-center justify-center'>
            <Paper className='bg2 p-10 m-10'>
                <div className="mb-2">
                    <label htmlFor="image-upload" className="text-green-500 cursor-pointer">Upload Profile Picture</label>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                 </div>
                {inputImage && <img src={inputImage} alt="User Image" className="mb-2" />}

                <FormControl component="fieldset" className="w-full" onSubmit={handleSubmit}>
                    <FormGroup>
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} color='success' sx={{ mb: 2 }} />
                        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} color='success' sx={{ mb: 2 }} />
                        <TextField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} color='success' sx={{ mb: 2 }} />
                        <TextField label="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} color='success' sx={{ mb: 2 }} />
                    </FormGroup>
                    <Button type="submit" color="success" variant="contained" sx={{ textTransform: 'none' }}>Sign up</Button>
                </FormControl>
            </Paper>
        </div>
    );
}

export default SignUp;

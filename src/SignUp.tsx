import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from "./APIconfig.ts"
import '/src/css/Color.scss';
import {User} from './UserInterface.ts'

import { Paper, FormGroup, TextField, Button } from '@mui/material';

function SignUp() {

    const [inputImage, setInputImage] = useState("");

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('');
    
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorText, setNameErrorText] = useState<string>('');
    
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState<string>('');
    
    const [address, setAddress] = useState<string>('');
    const [addressError, setAddressError] = useState<boolean>(false);
    const [addressErrorText, setAddressErrorText] = useState<string>('');

    const navigate = useNavigate()
    

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
        handleSignup()

    }

    const handleSignup = () => {
        let error : boolean = false
        //email為空判斷
        if(email == ''){
            setEmailError(true)
            setEmailErrorText("請輸入電子郵件")
            error = true
        }
        else{
            setEmailError(false)
            setEmailErrorText("")
        }
        //passward為空判斷
        if(password == ''){
            setPasswordError(true)
            setPasswordErrorText("請輸入密碼")
            error =  true
        }
        else{
            setPasswordError(false)
            setPasswordErrorText("")
        }
        //confirmPassword
        if (confirmPassword != password) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText("密碼不相同");
            error = true;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorText("");
        }
        //name為空判斷
        if(name == ''){
            setNameError(true)
            setNameErrorText("請輸入姓名")
            error =  true
        }
        else{
            setNameError(false)
            setNameErrorText("")
        }
        //phonenumber為空判斷
        if(phoneNumber == ''){
            setPhoneNumberError(true)
            setPhoneNumberErrorText("請輸入電話")
            error =  true
        }
        else{
            setPhoneNumberError(false)
            setPhoneNumberErrorText("")
        }
        //address為空判斷
        if(address == ''){
            setAddressError(true)
            setAddressErrorText("請輸入地址")
            error =  true
        }
        else{
            setAddressError(false)
            setAddressErrorText("")
        }

        if (error){
            return;
        }

        axios
        .post<User>(baseURL + "user/register", {    
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            avatar: inputImage,
            addresses: [address]           
        })
        .then(() => {
            navigate('/login')
        })
        .catch((error) => {
            console.log(error);
            setEmailError(true)
            setEmailErrorText("")
            setPasswordError(true)
            setPasswordErrorText("")
            setConfirmPasswordError(false)
            setConfirmPasswordErrorText("")
            setNameError(true)
            setNameErrorText("")
            setPhoneNumberError(true)
            setPhoneNumberErrorText("")
            setAddressError(true)
            setAddressErrorText("資料格式錯誤")
        });
    }

    function HandleEmailPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("PasswordInput")?.focus();
        }
    }
    
    function HandlePasswordPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("ConfirmPasseordInput")?.focus();
        }
    }
    function HandleConfirmPasswordPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("NameInput")?.focus();
        }
    }
    
    function HandleNamePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("PhoneNumberInput")?.focus();
        }
    }
    
    function HandlePhoneNumberPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("AddressInput")?.focus();
        }
    }
    
    function HandleAddressPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("Signup")?.focus();
        }
    }



    return (
        <div className='flex items-center justify-center'>
            <Paper className='bg2 p-10 m-10'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="image-upload" className="text-green-500 cursor-pointer">Upload Profile Picture</label>
                        <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    {inputImage && <img src={inputImage} alt="Profile" className="mb-2" />}
                    <FormGroup>
                        <TextField label="Email" type="email" value={email}
                            color='success' sx={{ mb: 2 }}  
                            onChange={(e) => setEmail(e.target.value)} onKeyDown={HandleEmailPressEnter} 
                            error={emailError} helperText={emailErrorText} />
                        <TextField label="Password" type="password" value={password} 
                            color='success' sx={{ mb: 2 }} 
                            onChange={(e) => setPassword(e.target.value)} onKeyDown={HandlePasswordPressEnter} 
                            error={passwordError} helperText={passwordErrorText} />
                        <TextField label="Confirm Password" type="password" value={confirmPassword} 
                            color='success' sx={{ mb: 2 }} 
                            onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={HandleConfirmPasswordPressEnter} 
                            error={confirmPasswordError} helperText={confirmPasswordErrorText} />
                        <TextField label="Name" type="text" value={name} 
                            color='success' sx={{ mb: 2 }}
                            onChange={(e) => setName(e.target.value)} onKeyDown={HandleNamePressEnter} 
                            error={nameError} helperText={nameErrorText} />
                        <TextField label="Phone Number" type="text" value={phoneNumber} 
                            color='success' sx={{ mb: 2 }}
                            onChange={(e) => setPhoneNumber(e.target.value)} onKeyDown={HandlePhoneNumberPressEnter} 
                            error={phoneNumberError} helperText={phoneNumberErrorText} />
                        <TextField label="Address" type="text" value={address} 
                            color='success' sx={{ mb: 2 }}
                            onChange={(e) => setAddress(e.target.value)} onKeyDown={HandleAddressPressEnter} 
                            error={addressError} helperText={addressErrorText} />
                    </FormGroup>
                    <Button type="submit" color="success" variant="contained" sx={{ textTransform: 'none' }}>Sign up</Button>
                </form>
            </Paper>
        </div>
    );
    
}

export default SignUp;

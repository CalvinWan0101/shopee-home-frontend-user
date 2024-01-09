import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from "../APIconfig.ts"
import '/src/css/Color.scss';
import {User} from '../UserInterface.ts'
import Varify from './Verify.tsx'
import { Login , useLoginStore } from '../LoginState.ts';
import './Dialog.scss'

import { Paper, FormGroup, TextField, Button , ButtonBase , Avatar, Typography , Dialog , DialogTitle, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

function UserInformation() {

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

    const [addressList , setAddressList] = useState<string[]>([])

    const {User , Login} = useLoginStore<Login>((state) => state)

    const [isVarify , setIsVarify] = useState(false)

    const [openDialog , setOpenDialog] = useState(false)

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

    const handleSave = () => {
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
        //confirmPassword = passward?
        if (confirmPassword != password) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText("確認密碼不相同");
            error = true;
        }
        else if (confirmPassword ==  '') {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText("請輸入確認密碼");
            error = true;
        }
        else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorText("");
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
        //name為空判斷
        if(name == ''){
            setNameError(true)
            setNameErrorText("請輸入使用者名稱")
            error =  true
        }
        else{
            setNameError(false)
            setNameErrorText("")
        }
        //phonenumber為空判斷
        if(phoneNumber == ''){
            setPhoneNumberError(true)
            setPhoneNumberErrorText("請輸入電話號碼")
            error =  true
        }
        else{
            setPhoneNumberError(false)
            setPhoneNumberErrorText("")
        }

        if (error){
            return;
        }
        else{
            axios
            .put<User>(baseURL + "user/" + User.id, {    
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                avatar: inputImage,
                addresses: addressList         
            })
            .then((response) => {
                Login(response.data)
                navigate('/')
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
            });
        }
    }

    function HandleEmailPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            document.getElementById("SignupPassword")?.focus();
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


    function HandleInputAddress(address : string , index : number){
        const newAddressList = [...addressList]
        newAddressList[index] = address
        setAddressList(newAddressList)
    }

    function HandleDeleteAddress(index : number){
        const newAddressList = [...addressList]
        newAddressList.splice(index , 1)
        setAddressList(newAddressList)
    }

    function HandleAddAddress(){
        const newAddressList = [...addressList]
        newAddressList.push("")
        setAddressList(newAddressList)
    }

    function SaveAddress(){
        if (addressList.every((item) => item != "")){
            setOpenDialog(false)
        }
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;
    
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        
        return color;
    }
    
    function stringAvatar(name: string) {
        return {
            sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
        };
    }

    const defauleName = () => {return (name === "") ? "N" : name }

    function handleVerify(email : string , passward : string){
        setEmail(email)
        setPassword(passward)
        setConfirmPassword(passward)
        setIsVarify(true)
    }

    useEffect(() => {
        setInputImage(User.avatar)
        setName(User.name)
        setPhoneNumber(User.phoneNumber)
        setAddressList(User.addresses)
    } , [])

    return (
        <>
            {isVarify ?
                    <div className='flex items-center justify-center'>
                        <Paper className='bg2 px-10 pb-10 m-10'>
                                <div className=' my-5 flex items-center'>
                                    <label htmlFor='image-upload' className=' hover:cursor-pointer flex items-center'>
                                        <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                        <Avatar {...stringAvatar(defauleName())} src={inputImage}/>
                                        <Typography ml={"0.5rem"} color={'gray'}>
                                            Upload Avater
                                        </Typography>
                                    </label>
                                    <IconButton color='error' onClick={() => setInputImage("")}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                                <FormGroup>
                                    <TextField label="Email" type="email" value={email} style={{inputSecurity:'none'}}
                                        color='success' sx={{ mb: 2 }} id='SignupEmail'
                                        onChange={(e) => setEmail(e.target.value)} onKeyDown={HandleEmailPressEnter} 
                                        error={emailError} helperText={emailErrorText} />
                                    <TextField label="Password" type="password" value={password} style={{inputSecurity:'none'}}
                                        color='success' sx={{ mb: 2 }} id='SignupPassword'
                                        onChange={(e) => setPassword(e.target.value)} onKeyDown={HandlePasswordPressEnter} 
                                        error={passwordError} helperText={passwordErrorText} />
                                    <TextField label="Confirm Password" type="password" value={confirmPassword} 
                                        color='success' sx={{ mb: 2 }} id='ConfirmPasseordInput'
                                        onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={HandleConfirmPasswordPressEnter} 
                                        error={confirmPasswordError} helperText={confirmPasswordErrorText} />
                                    <TextField label="Name" type="text" value={name} 
                                        color='success' sx={{ mb: 2 }} id='NameInput'
                                        onChange={(e) => setName(e.target.value)} onKeyDown={HandleNamePressEnter} 
                                        error={nameError} helperText={nameErrorText} />
                                    <TextField label="Phone Number" type="text" value={phoneNumber} 
                                        color='success' sx={{ mb: 2 }} id='PhoneNumberInput'
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        error={phoneNumberError} helperText={phoneNumberErrorText} />
                                </FormGroup>
                                <Button onClick={() => setOpenDialog(true)} color="success" variant='outlined' className=' w-full' sx={{mb:5 , textTransform: 'none' }}>Address</Button>
                                <Dialog open={openDialog}>
                                    <DialogTitle>
                                        Address
                                        <IconButton color='success' onClick={HandleAddAddress}>
                                            <AddBoxIcon/>
                                        </IconButton>
                                    </DialogTitle>
                                    <FormGroup>
                                        {addressList.map((address , index) => (
                                            <div key={index} className=' mr-5 flex items-center'>
                                                <IconButton color='error' onClick={() => HandleDeleteAddress(index)} sx={{mb:3}}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <TextField label={`Address ${index + 1}`} type="text" value={address} 
                                                    color='success' sx={{ mb: 2 }} id={`Address${index + 1}`}
                                                    onChange={(e) => HandleInputAddress(e.target.value , index)}
                                                    error={address === ''} helperText={(address === '') ? "請輸入地址" : ""} />
                                            </div>
                                        ))}
                                        <Button onClick={SaveAddress} color="success" variant="contained" className=' ' sx={{ textTransform: 'none' , m:1 }}>Save</Button>
                                    </FormGroup>
                                </Dialog>
                                <Button onClick={handleSave} color="success" variant="contained" className=' w-full' sx={{ textTransform: 'none' }}>Save</Button>
                        </Paper>
                    </div>:
                <Varify ok={handleVerify}/>
            }
        </>
    );
    
}

export default UserInformation;
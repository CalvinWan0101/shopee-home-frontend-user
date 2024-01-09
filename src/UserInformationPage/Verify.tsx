import React, { useEffect, useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import axios from 'axios';

import { Login , useLoginStore } from '../LoginState';
import {User} from '../UserInterface.ts'
import { baseURL } from '../APIconfig';

import {Button , Paper , TextField , Typography} from '@mui/material'

function Verify(props:{ok : (email : string , password : string) => void}) {

        
    const [account, setAccount] = useState<string>('');
    const [accountError, setAccountError] = useState<boolean>(false)
    const [accountErrorText, setAccountErrorText] = useState<string>('')

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordErrorText, setPasswordErrorText] = useState<string>("")

    const navigate = useNavigate()

    const {LoginState , User , Login} = useLoginStore<Login>( (state) => state );

    useEffect(() => {
        if (!LoginState){
            navigate('/login')
        }
    } , [])

    function HandleLogIn(){
        let error : boolean = false
        if(account == ''){
            setAccountError(true)
            setAccountErrorText("請輸入帳號")
            error = true
        }
        else{
            setAccountError(false)
            setAccountErrorText("")
        }
        if(password == ''){
            setPasswordError(true)
            setPasswordErrorText("請輸入密碼")
            error =  true
        }
        else{
            setPasswordError(false)
            setPasswordErrorText("")
        }
        
        if (error){
            return;
        }

        axios
        .post<User>(baseURL + "user/login", {
            email:account,
            password:password
        })
        .then((response) => {
            if (response.data.id === User.id){
                props.ok(account , password)
            }
            else{
                setAccountError(true)
                setAccountErrorText("帳號或密碼錯誤")
                setPasswordError(true)
                setPasswordErrorText("帳號或密碼錯誤")
            }
        })
        .catch((error) => {
            console.log(error);
            setAccountError(true)
            setAccountErrorText("帳號或密碼錯誤")
            setPasswordError(true)
            setPasswordErrorText("帳號或密碼錯誤")
        });
    }

    function HandleAccountPerssEnter(e: React.KeyboardEvent<HTMLDivElement>){
        if(e.key == "Enter"){
            document.getElementById("LogInPassword")?.focus()           
        }
    }

    function HandlePasswordPressEnter(e: React.KeyboardEvent<HTMLDivElement>){
        if(e.key == "Enter"){
            HandleLogIn()
        }
    }

    return (
        <div className=' flex items-center justify-center'>
            <Paper className=' bg2 p-10 m-10'>
                <div className=' mb-3'>
                    <Typography variant='h5' color={'gray'}>
                        請輸入帳號密碼
                    </Typography>
                </div>
                <div>
                    <TextField id="LogInAcount" sx={{mb:2}} label="Account" variant="outlined" color='success' 
                        onChange={Event => setAccount(Event.target.value)} error={accountError} helperText={accountErrorText}
                        onKeyDown={(e) => HandleAccountPerssEnter(e)}/>
                    <div/>
                    <TextField id="LogInPassword" sx={{mb:2}} label="Password" variant="outlined" color='success'
                        onChange={Event => setPassword(Event.target.value)} error={passwordError} helperText={passwordErrorText}
                        onKeyDown={(e) => HandlePasswordPressEnter(e)} type='password'/>
                    <div/>
                    <Button id='LogInBtn' sx={{textTransform:'none'}} fullWidth={true} variant='contained' color='success' onClick={HandleLogIn}>Verify</Button>
                </div>
            </Paper>
        </div>
    )
}

export default Verify
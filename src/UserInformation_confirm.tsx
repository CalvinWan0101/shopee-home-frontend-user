import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import axios from 'axios';

import { baseURL } from "./APIconfig.ts"
import '/src/css/Color.scss'
import {Login , useLoginStore} from './LoginState.ts'
import {User} from './UserInterface.ts'

import {Button , Paper , TextField} from '@mui/material'

function UserInformation_confirm() {

    const { User , Login } = useLoginStore<Login>( (state) => state );
    const navigate = useNavigate()

    const [account] = useState(User.email);

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordErrorText, setPasswordErrorText] = useState<string>("")



    function HandleLogIn(){
        let error : boolean = false
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
            setPasswordError(false)
            setPasswordErrorText("")
            Login(response.data)
            navigate('/PersionalInformation')
        })
        .catch((error) => {
            console.log(error);
            setPasswordError(true)
            setPasswordErrorText("密碼錯誤")
        });
    }

    function HandlePasswordPressEnter(e: React.KeyboardEvent<HTMLDivElement>){
        if(e.key == "Enter"){
            HandleLogIn()
        }
    }

    return (
        <div className=' flex items-center justify-center'>
            <Paper className=' bg2 p-10 m-10'>
                <div>
                    <TextField id="LogInAcount" sx={{mb:2}} label="Account" variant="outlined" color='success'     
                        defaultValue = {User.email}
                        disabled/>
                    <div/>
                    <TextField id="LogInPassword" sx={{mb:2}} label="Password" variant="outlined" color='success'
                        onChange={Event => setPassword(Event.target.value)} error={passwordError} helperText={passwordErrorText}
                        onKeyDown={(e) => HandlePasswordPressEnter(e)} type='password'/>
                    <div/>
                    <Button id='LogInBtn' sx={{textTransform:'none'}} fullWidth={true} variant='contained' color='success' onClick={HandleLogIn}>Login</Button>
                </div>
            </Paper>
        </div>
    )
}

export default UserInformation_confirm
import React, { useState } from 'react'
import './LogIn.scss'
import './Color.scss'
import {Button , Paper , TextField} from '@mui/material'
import { useNavigate , Link } from 'react-router-dom'
import ButtonGroup from '@mui/material/ButtonGroup'
import {Login , useLoginStore} from './LoginState'

function LogIn() {
    
    const [account, setAccount] = useState<string>('');
    const [accountError, setAccountError] = useState<boolean>(false)
    const [accountErrorText, setAccountErrorText] = useState<string>('')

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordErrorText, setPasswordErrorText] = useState<string>("")

    const navigate = useNavigate()

    const {LoginState , setLoginState} = useLoginStore<Login>( (state) => state );

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

        // TODO: back-end login

        // if(account != 'test123' || password != '123123'){
        //     setAccountError(true)
        //     setAccountErrorText("帳號或密碼錯誤")
        //     setPasswordError(true)
        //     setPasswordErrorText("帳號或密碼錯誤")
        //     error = true
        // }
        if(error){
            return;
        }
        setLoginState(true);
        navigate('/')
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
                <div>
                    <TextField id="LogInAcount" sx={{mb:2}} label="Account" variant="outlined" color='success' 
                        onChange={Event => setAccount(Event.target.value)} error={accountError} helperText={accountErrorText}
                        onKeyDown={(e) => HandleAccountPerssEnter(e)}/>
                    <div/>
                    <TextField id="LogInPassword" sx={{mb:2}} label="Password" variant="outlined" color='success'
                        onChange={Event => setPassword(Event.target.value)} error={passwordError} helperText={passwordErrorText}
                        onKeyDown={(e) => HandlePasswordPressEnter(e)} type='password'/>
                    <div/>
                    <Button id='LogInBtn' sx={{textTransform:'none'}} fullWidth={true} variant='contained' color='success' onClick={HandleLogIn}>Login</Button>
                    <Link to={'/'} className='float-right text-green-500 hover:text-green-700 hover:underline'>Sign up</Link>
                </div>
            </Paper>
        </div>
    )
}

export default LogIn
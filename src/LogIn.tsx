import React, { useState } from 'react'
import './LogIn.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import ButtonGroup from '@mui/material/ButtonGroup'

function LogIn() {
    
    const [account, setAccount] = useState<string>('');
    const [accountError, setAccountError] = useState<boolean>(false)
    const [accountErrorText, setAccountErrorText] = useState<string>('')

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordErrorText, setPasswordErrorText] = useState<string>("")

    const navigate = useNavigate()

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
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%' }}>
            <div id="login">
                <div>
                    <TextField sx={{m:'5px'}} id="LogInAcount" label="Account" variant="outlined" 
                        onChange={Event => setAccount(Event.target.value)} error={accountError} helperText={accountErrorText}
                        onKeyDown={(e) => HandleAccountPerssEnter(e)}/>
                    <div/>
                    <TextField sx={{m:'5px'}} id="LogInPassword" label="Password" variant="outlined" 
                        onChange={Event => setPassword(Event.target.value)} error={passwordError} helperText={passwordErrorText}
                        onKeyDown={(e) => HandlePasswordPressEnter(e)} type='password'/>
                    <div/>
                    <ButtonGroup sx={{m:'5px'}} fullWidth={true} variant='contained' disableElevation={true}>
                        <Button id='LogInBtn' onClick={HandleLogIn}>Log In</Button>
                        <Button id='SignUpBtn'>Sign Up</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default LogIn
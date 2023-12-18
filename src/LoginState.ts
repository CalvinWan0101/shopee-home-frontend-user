import {create} from 'zustand'

export interface Login {
    LoginState: boolean;
    setLoginState: (state:boolean) => void
}

export const useLoginStore = create<Login>()((set) => ({
    LoginState: false,
    setLoginState: (state) => set( {LoginState: state} )
}))
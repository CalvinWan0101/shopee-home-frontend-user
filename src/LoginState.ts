import {create} from 'zustand'
import {User} from './UserInterface.ts'

export interface Login {
    LoginState: boolean;
    User: User;
    Login: (InputUser:User) => void;
    Logout: () => void;
}

const EmptyUser:User ={
    id : "",
    email : "",
    name : "",
    phoneNumber : "",
    avatar : "",
    addresses:[],
    deleted:false,
}

export const useLoginStore = create<Login>()((set) => ({
    LoginState: false,
    User: EmptyUser,
    Login: (InputUser) => set({LoginState: true , User:InputUser}),
    Logout: () => set({LoginState:false , User:EmptyUser})
}))
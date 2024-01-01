interface Shop{
    id: string,
    email: string,
    name: string,
    phoneNumber: string,
    address: string,
    description: string,
    avatar: string,
    background: string,
    createrId: string,
    deleterId: string | null,
    deleted: boolean
}
import {create} from 'zustand'

export interface IOrderCreate{
    selectCouponId : string;
    discount : number;
    price : number;
    shippingCouponList : shippingCouponUserDto[];
    seasoningCouponList : seasoningCouponUserDto[];
    selectAddress : string;
    setSelectCouponId : (id:string) => void;
    setSelectAddress : (address : string) => void;
    setDiscount : (discount : number) => void;
    setPrice : (price : number) => void;
    setShippingCouponList : (shippingCouponList : shippingCouponUserDto[]) => void;
    setSeasoningCouponList : (seasoningCouponList : seasoningCouponUserDto[]) => void;
}

export const useOrderCreateStore = create<IOrderCreate>()((set) =>({
    selectCouponId : "",
    selectAddress : "",
    discount : 0,
    price : 1000000,
    shippingCouponList : [],
    seasoningCouponList : [],
    setSelectCouponId : (id) => set({selectCouponId : id}),
    setSelectAddress : (address) => set({selectAddress : address}),
    setDiscount : (discount) => set({discount : discount}),
    setPrice : (price) => set({price : price}),
    setShippingCouponList : (shippingCouponList) => set({shippingCouponList : shippingCouponList}),
    setSeasoningCouponList : (seasoningCouponList) => set({seasoningCouponList : seasoningCouponList})
})) 
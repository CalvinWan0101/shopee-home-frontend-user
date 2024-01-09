import {create} from 'zustand'
import { ProductInShoppingcart } from '../ShoppingcartPage/ShoppingcartDataInterface';

export interface IOrderCreate{
    selectCouponId : string;
    discount : number;
    shippingCouponList : shippingCouponUserDto[];
    seasoningCouponList : seasoningCouponUserDto[];
    selectAddress : string;
    productList : ProductInShoppingcart[];
    shopId : string;
    setSelectCouponId : (id:string) => void;
    setSelectAddress : (address : string) => void;
    setDiscount : (discount : number) => void;
    setShippingCouponList : (shippingCouponList : shippingCouponUserDto[]) => void;
    setSeasoningCouponList : (seasoningCouponList : seasoningCouponUserDto[]) => void;
    setProductList : (productList : ProductInShoppingcart[] , shopId : string) => void;
}

export const useOrderCreateStore = create<IOrderCreate>()((set) =>({
    selectCouponId : "",
    selectAddress : "",
    discount : 0,
    shippingCouponList : [],
    seasoningCouponList : [],
    productList : [],
    shopId : "",
    setSelectCouponId : (id) => set({selectCouponId : id}),
    setSelectAddress : (address) => set({selectAddress : address}),
    setDiscount : (discount) => set({discount : discount}),
    setShippingCouponList : (shippingCouponList) => set({shippingCouponList : shippingCouponList}),
    setSeasoningCouponList : (seasoningCouponList) => set({seasoningCouponList : seasoningCouponList}),
    setProductList : (productList , shopId) =>   set({    
                                            selectCouponId : "",
                                            selectAddress : "",
                                            discount : 0,
                                            shippingCouponList : [],
                                            seasoningCouponList : [],
                                            productList : productList,
                                            shopId : shopId,
                                        })
})) 
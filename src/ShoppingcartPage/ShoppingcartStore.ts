import {create} from 'zustand'
import { ShopChecked , ShopInShoppingcart } from './ShoppingcartDataInterface';

export interface shoppingcartStore{
    shopList : ShopInShoppingcart[];
    shopCheckList : ShopChecked[];
    setShopList : (shopList : ShopInShoppingcart[]) => void;
    setShopCheckList : (shopCheckList : ShopChecked[]) => void;
}

export const useShoppingcartStore = create<shoppingcartStore>()((set) => ({
    shopList : [],
    shopCheckList : [],
    setShopList : (shopList) => set({shopList : shopList}),
    setShopCheckList : (shopCheckList) => set({shopCheckList : shopCheckList}),
}))
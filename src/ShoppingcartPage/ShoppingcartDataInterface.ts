interface ProductInShoppingcart {
    productName: string;
    Img: string;
    price: number;
    amount: number;
    checked: boolean;
}

interface ShopInShoppingcart {
    shopName: string;
    shopId: string;
    productList: ProductInShoppingcart[];
}

interface UsersShoppingcart {
    userId: string;
    ShopList: ShopInShoppingcart[];
}

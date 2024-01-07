export interface ShopInShoppingcart {
    id:       string;
    name:     string;
    products: ProductInShoppingcart[];
}

export interface ProductInShoppingcart {
    id:       string;
    name:     string;
    image:    string;
    quantity: number;
    price:    number;
}

export interface ShopChecked {
    productChecked : boolean[];
}
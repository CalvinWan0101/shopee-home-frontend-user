export interface shoppingCart{
    shops: ShopInShoppingcart[]
}

export interface ShopInShoppingcart {
    id:       string;
    name:     string;
    products: ProductInShoppingcart[];
}

export interface ProductInShoppingcart {
    id:            string;
    image:         string;
    name:          string;
    price:         number;
    quantity:      number;
    quantityLimit: number;
}

export interface ShopChecked {
    productChecked : boolean[];
}
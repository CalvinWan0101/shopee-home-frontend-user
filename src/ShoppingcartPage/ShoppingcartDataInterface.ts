interface Product {
    productName: string;
    Img: string;
    price: number;
    amount: number;
    checked:boolean;
}

interface Shop {
    shopName: string;
    shopId: string;
    productList: Product[];
}

interface UserData {
    userId: string;
    ShopList: Shop[];
}

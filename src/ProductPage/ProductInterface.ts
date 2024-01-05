interface ProductDetail {
    id : string;
    name : string;
    amount : number;
    sales : number;
    price : number;
    description : string;
    discountRate : number | null;
    discountDate : Date | null;
    shopId : string;
    images : string[];
    deleted : boolean;
}

interface CreateNewProduct{
    name: string,
    amount: 81,
    description: string,
    discountRate: number,
    discountDate: Date,
    shopId: string,
    images: string[],
    isDeleted: boolean
}

interface ProductInList{
    id: string;
    name: string;
}

interface ProductPreview {
    name: string;
    finalPrice: number;
    sales: number;
    image: string;
}
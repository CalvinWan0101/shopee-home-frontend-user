export interface OrderSend {
    userId:   string;
    address:  string;
    couponId: string;
    products: ProductInOrderSend[];
}

export interface ProductInOrderSend {
    id:       string;
    quantity: number;
}

export interface Order {
    id:            string;
    userId:        string;
    couponId:      null | string;
    address:       string;
    totalPrice:    number;
    shippingCost:  number;
    rate:          number;
    shippingLimit: number;
    startTime:     null | Date;
    deliverTime:   null | Date;
    products:      ProductInOrder[];
}

export interface ProductInOrder {
    id:       string;
    name:     string;
    price:    number;
    quantity: number;
    image:    string;
}
interface ShopCouponList {
    seasoningCouponUserDtos: seasoningCouponUserDto[];
    shippingCouponUserDtos:  shippingCouponUserDto[];
}

interface seasoningCouponUserDto {
    id:             string;
    date:           string;
    shopId:         string;
    rate:           number;
    used:           boolean;
    deleted:        boolean;
    claimed:        boolean;
}

interface shippingCouponUserDto {
    id:             string;
    date:           string;
    shopId:         string;
    used:           boolean;
    deleted:        boolean;
    claimed:        boolean;
    shippingLimit:  number;
}
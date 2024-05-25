

export interface Product{
    _id:string,
    sellerId:string,
    product:string,
    stock:string,
    price:string,
    image:string,
    description:string,
    category:string,
    featured:string,
    status?:string
}
export interface Customer{
     _id?:string
     name:string,
     email:string,
     mobile:string,
     billing_address:{
          address:string,
          country:string,
          state:string,
          city:string,
          zipcode:string
     }
}
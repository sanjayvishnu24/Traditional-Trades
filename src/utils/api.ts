import axios from "axios";

export function getUrl()
{
     return "http://localhost:3200/api/";
}
export async function getSellerId()
{
       
       const data1 = await axios.get(
         `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`
       );
       return data1.data[0].sellerId;
       
}


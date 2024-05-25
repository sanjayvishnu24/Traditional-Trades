import axios from "axios";
import { Link, NavLink, useLoaderData, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { getSellerId, getUrl } from "../utils/api";
import { Product as ProductType } from "../types/Product";
import Loading from "./Loading";
 
const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
  align-items: center;
  height: 200px;
  padding: 0px 10px 0px 30px;
  box-sizing: border-box;
`;

const ProductContainer = styled.section`
  box-sizing: border-box;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
 
   
`;
const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  color: gray;
  font-weight: normal;
`;
const TableData = styled.td`
  padding: 10px;
`;

const Product = () => {
  
  const products=useLoaderData() as ProductType[];
  console.log(products);
   const navigation=useNavigation()
  return (
    <main className="w-full">
      {navigation.state == "loading" && <Loading></Loading>}
      <Container>
        <div>
          <div>
            <p className="text-3xl">Products</p>
          </div>
        </div>
        <div className="text-center">
          <Link
            to={"form"}
            className="py-1.5 px-1.5 rounded-md bg-violet-600 text-white"
          >
            + Add Product
          </Link>
        </div>
      </Container>
      <ProductContainer className="border border-gray-300">
        <table className="w-full border border-seperate border-spacing-4">
          <thead>
            <tr>
              <TableHeader className="">Name</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>status</TableHeader>
              <TableHeader>View/edit</TableHeader>
            </tr>
          </thead>

          <tbody>
            { products.length==0 && (
              <div className="w-full h-full inset -5 text-3xl" style={{position:"absolute",top:"60%",left:"50%"}}>No Products</div>
            )}
            {products.map((product: ProductType) => {
              return (
                <>
                  <tr className="border border-gray-200">
                    <TableData className="flex gap-x-5 items-center">
                      <div
                        style={{
                          display: "flex",
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={product.image}
                          alt=""
                        />
                      </div>

                      <p className="block text-xl">{product.product}</p>
                    </TableData>
                    <TableData>{product.stock}</TableData>
                    <TableData>{product.description}</TableData>
                    <TableData>{product.price}</TableData>
                    <TableData>{product.status}</TableData>
                    <TableData>
                      <NavLink
                        className="text-sky-400 hover:text-sky-900"
                        to={`update/${product._id}`}
                      >
                        View product
                      </NavLink>
                    </TableData>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </ProductContainer>
    </main>
  );
};

export async function loader(){
   console.log(await getSellerId())
     try{
         const {data}=await axios.get(getUrl()+'product/bySeller/'+await getSellerId());
         console.log(data)
         return data.data;
     }
     catch{
         return new Error;
     }
   
}
export default Product;

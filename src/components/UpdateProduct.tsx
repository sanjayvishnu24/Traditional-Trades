import { useState } from "react";
import styled from "styled-components";
import { uploadImageFirebase as uploadImage } from "../../src/utils/firebase";

import { Form, NavLink, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { Product } from "../types/Product";
import axios from "axios";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUrl } from "../utils/api";

const Input = styled.input`
  display: block;
  outline-color: rgb(220, 218, 218);
  border: 1px solid rgb(220, 218, 218);
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;
const Select = styled.select`
  display: block;
  outline-color: rgb(220, 218, 218);
  border: 1px solid rgb(220, 218, 218);
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;
export class Image {
  image: any = "";
  getImage() {
    return this.image;
  }
  setImage(image: any) {
    this.image = image;
  }
}

const imageObj = new Image();
const UpdateProduct = () => {

  const product=useLoaderData() as Product;
  console.log(product)
  const navigation = useNavigation();
  const [image, setImage] = useState<FileList | null>();
  console.log(image);
  const handleChange = (event: any) => {
    setImage(event?.target.files[0]);
  };
  const[method,setMethod]=useState<string>('')
  const submit=useSubmit();
  const handleDelete=()=>{
       if (confirm("confim to delete")) {
          
         submit(null, { method: "DELETE" });
         setMethod('delete')
       }
  }
  const upload = () => {
    imageObj.setImage(image);
  };
  return (
    <>
      <main className="w-full py-5 px-5 ">
        <div className="h-1/4 grid grid-cols items-center">
          <div>
            <NavLink to={"/products"}>
              <FontAwesomeIcon icon={faArrowLeftLong} /> Product
            </NavLink>
          </div>
          <div>
            <h1 className="text-2xl">Update Products</h1>
          </div>
        </div>
        <Form 
          method="post"
          className="grid grid-cols-2 gap-y-5 gap-x-7 w-11/12 p-5 items-center"
        >
          <div>
            <label htmlFor="product">Product Name</label>
            <Input
              type="text"
              name="product"
              defaultValue={product.product}
              pattern="^[a-zA-z0-9]*$"
              minLength={4}
              required
            />
          </div>
          <div>
            <label htmlFor="stock">stock</label>
            <Input
              type="number"
              defaultValue={product.stock}
              name="stock"
              min={1}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Select name="category" defaultValue={product.category} required>
              <option value="">Choose</option>
              <option value="tamilnadu">Tamilnadu</option>
              <option value="andhra pradesh">Andhra pradesh</option>
              <option value="kerala">Kerala</option>
            </Select>
          </div>
          <div>
            <label htmlFor="stock">Featured</label>
            <Select name="featured" defaultValue={product.featured} required>
              <option value="">choose</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </Select>
          </div>
          <div>
            <label className="inline-block" htmlFor="price">
              Price
            </label>
            <Input
              type="number"
              name="price"
              defaultValue={product.price}
              min={10}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Input
              type="file"
              onChange={handleChange}
              name="image"
              required
            ></Input>
          </div>

          <div className="col-span-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id=""
              className="border-2 flow-root mt-2 outline-2 outline-gray-100 rounded-md"
              cols={70}
              defaultValue={product.description}
              rows={5}
            ></textarea>
          </div>
          <div className="flex gap-x-2" style={{ alignSelf: "flex-end" }}>
            <button
              onClick={handleDelete}

              type="button"
              className="bg-red-600 px-2 py-2 w-2/3 rounded-md flex-end text-white"
            >
              {(navigation.state == "submitting" && method && "...Deleting") || "Delete"}
            </button>
            <button
              onClick={upload}
              className="bg-violet-800 px-2 py-2 w-2/3 rounded-md flex-end text-white"
            >
              {(navigation.state == "submitting" && !method &&  "...Submitting") || "Update"}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};

export async function loader(id:any){
   
         const {data}=await axios.get(getUrl()+`product/${id}`);
         console.log(data)
         return await data.data;
    
     
}
export async function action(formdata: FormData,id:any) {
  const productData: Product = JSON.parse(
    JSON.stringify(Object.fromEntries(formdata))
  );

  const res = await uploadImage(imageObj, "images");
  productData.image = res + "";
  axios
    .patch(`http://localhost:3200/api/product/${id}`, productData)
    .then(() => console.log("success"));

  return new Promise((resolve)=>{
    return setTimeout(() =>{
      resolve("success");
    },2000);
  });
}

export default UpdateProduct;

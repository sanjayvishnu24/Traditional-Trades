import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link,useLoaderData, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { Seller as SellerType } from "./Seller.js";
import { getUrl } from "../../utils/api.js";
import axios from "axios";
import Loading from "../Loading.js";

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
  align-items: center;
  height: 200px;
  align-content: space-around;
  padding: 0px 10px 0px 30px;
  box-sizing: border-box;
`;
const Input = styled.input`
  width: 90%;
  outline: none;
  border: none;
  box-sizing: content-box;
  padding: 10px;
`;
const TableData = styled.td`
  padding: 10px;
`;
const TableHeader = styled.th`
  padding: 10px;
  color: gray;
  font-weight: normal;
`;

const CustomerContainer = styled.section`
  box-sizing: border-box;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
`;
const Customer = () => {
  const users = useLoaderData() as SellerType[];
  console.log(users)
  const navigation = useNavigation();
  console.log(navigation.state);
  
  const [outlineColor, setOutlineColor] = useState<string>();
  const changeStyle = () => {
    if (!outlineColor) {
      setOutlineColor("outline outline-violet-600");
      return;
    }
    setOutlineColor("");
  };
  return (
    <>
      <main className="w-full">
        {navigation.state == "loading" && <Loading></Loading>}{" "}
        {navigation.state == "loading" && <Loading></Loading>}
        <Container>
          <div>
            <div>
              <p className="text-3xl">Sellers</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to={"/admin/addSeller"}
              className="py-1.5 px-1.5 rounded-md bg-violet-600 text-white"
            >
              + Add Seller
            </Link>
          </div>
          <div className="col-span-2 mr-5">
            <div className="border border-gray px-3 py-3 rounded-md">
              <div
                className={`items-center border border-gray-300 p-1 w-3/4 rounded-md ${outlineColor}`}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-gray-200 relative left-1"
                />
                <Input
                  type="text"
                  placeholder="search Seller"
                  onFocus={changeStyle}
                  onBlur={changeStyle}
                  
                />
              </div>
            </div>
          </div>
        </Container>
        <CustomerContainer className="border border-gray-300">
          <table className="border border-seperate border-spacing-2 w-full">
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Mobile Number</TableHeader>
              </tr>
            </thead>
            <tbody className="">
              {users.map((item: SellerType) => {
                return (
                  <>
                    <tr className="text-center border border-gray-200">
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
                            src={item.image}
                            alt=""
                          />
                        </div>

                        <p className="block text-xl">{item.name}</p>
                      </TableData>
                      <TableData>{item.email}</TableData>
                      <TableData>
                        {item.address},{item.state},{item.city}
                      </TableData>
                      <TableData>{item.mobile}</TableData>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </CustomerContainer>
      </main>
    </>
  );
};

export async function loader() {
  const data:SellerType = (await axios.get(getUrl() + "seller")).data;
  console.log(data);
  return data;
}
export default Customer;

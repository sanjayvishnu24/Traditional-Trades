import axios from "axios";
import { Form, NavLink, useLoaderData, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { Customer } from "../../types/Customer";
import { getUrl } from "../../utils/api.js";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Input = styled.input`
  display: block;
  outline-color: rgb(220, 218, 218);
  border: 1px solid rgb(220, 218, 218);
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;

const AdminUpdateCustomer = () => {
  const customer = useLoaderData() as Customer;

  const navigation = useNavigation();
  return (
    <>
      <main className="w-full py-5 px-7 ">
        <div className="h-1/4 grid grid-cols items-center">
          <div>
            <NavLink to={"/admin/main"}>
              <FontAwesomeIcon icon={faArrowLeftLong} /> Customer
            </NavLink>
          </div>
          <div>
            <h1 className="text-2xl">Update Customer</h1>
          </div>
        </div>
        <Form
          method="post"
          className="grid grid-cols-2 gap-y-5 gap-x-7 w-11/12 px-5 py-10 items-center"
        >
          <div>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              defaultValue={customer.name}
              name="name"
              minLength={6}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              pattern="^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
              name="email"
              minLength={10}
              defaultValue={customer.email}
              required
            />
          </div>
          <div>
            <label htmlFor="mobile">mobile</label>
            <Input
              type="text"
              pattern="^[0-9]{10}$"
              name="mobile"
              defaultValue={customer.mobile}
              maxLength={10}
              minLength={10}
              min={9999999999}
              required
            />
          </div>
          <div className="col-span-2">
            <hr />
          </div>
          <div className="col-span-2">
            <h1 className="text-xl py-3">Billing Information</h1>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <Input type="text" value="India" defaultValue="sdc" disabled />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <Input
              type="text"
              minLength={4}
              defaultValue={customer.billing_address.state}
              name="state"
            ></Input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <Input
              type="text"
              minLength={4}
              defaultValue={customer.billing_address.city}
              name="city"
            ></Input>
          </div>
          <div>
            <label htmlFor="zipcode">Zipcode</label>
            <Input
              type="text"
              defaultValue={customer.billing_address.zipcode}
              minLength={6}
              maxLength={6}
              pattern="^[0-9]{6}$"
            />
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <Input
              type="text"
              defaultValue={customer.billing_address.address}
              minLength={15}
              name="address"
            />
          </div>
          <div
            className="flex gap-x-5 items-center"
            style={{ alignSelf: "flex-end", flexFlow: "row-reverse" }}
          >
            <NavLink
              to={"/"}
              type="button"
              className="border-2 border-gray-300 px-2 py-2  rounded-md flex-end"
            >
              Cancel
            </NavLink>
            <button className="text-white bg-violet-600 px-2 py-2  rounded-md flex-end">
              {(navigation.state == "submitting" && "...Submitting") ||
                "Update"}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};

export async function action(formdata: FormData, id: any) {
  const data = JSON.parse(JSON.stringify(Object.fromEntries(formdata)));
  console.log(data);
  const customerData: Customer = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    billing_address: {
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
    },
  };
  const res = await axios.patch(getUrl() + `customers/${id}`, customerData);
  console.log(res);
  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve("success");
    }, 2000);
  });
}

export async function loader(id: any){
  const { data } = await axios.get(getUrl() + `customers/${id}`);
  console.log(data);
  return await data.data;
}
export default AdminUpdateCustomer;

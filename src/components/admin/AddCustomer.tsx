import axios from "axios";
import { Form, NavLink, useNavigation } from "react-router-dom";
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

const AddCustomer= () => {
  const navigation = useNavigation();
  return (
    <>
      <main className="w-full py-5 px-7 ">
        <div className="h-1/4 grid grid-cols items-center">
          <div>
            <NavLink to={"/"}>
              <FontAwesomeIcon icon={faArrowLeftLong} /> Customer
            </NavLink>
          </div>
          <div>
            <h1 className="text-2xl">Create Customer</h1>
          </div>
        </div>
        <Form
          method="post"
          className="grid grid-cols-2 gap-y-5 gap-x-7 w-11/12 px-5 py-10 items-center"
        >
          <div>
            <label htmlFor="name">Name</label>
            <Input type="text" name="name" minLength={6} required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              pattern="^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
              name="email"
              minLength={10}
              required
            />
          </div>
          <div>
            <label htmlFor="mobile">mobile</label>
            <Input
              type="text"
              pattern="^[0-9]{10}$"
              name="mobile"
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
            <Input type="text" defaultValue="India" disabled />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <Input type="text" minLength={4} name="state"></Input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <Input type="text" minLength={4} name="city"></Input>
          </div>
          <div>
            <label htmlFor="zipcode">Zipcode</label>
            <Input
              type="text"
              minLength={6}
              maxLength={6}
              pattern="^[0-9]{6}$"
            />
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <Input type="text" minLength={15} name="address" />
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
                "Create Customer"}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};

export async function action(formdata: FormData) {
  const data = JSON.parse(JSON.stringify(Object.fromEntries(formdata)));
  console.log(data);
  const customerData: Customer = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    billing_address: {
      address: data.address,
      country: data.country ? "India" : "",
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
    },
  };
  await axios.post(getUrl() + "customers", customerData);

  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve("success");
    }, 2000);
  });
}
export default AddCustomer;

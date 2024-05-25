import { createBrowserRouter, Outlet, redirect } from "react-router-dom";

import Product from "./components/Product";
import ProductForm from "./components/ProductForm";
import Orders from "./components/Orders";
import { action as productAction } from "./components/ProductForm";
import { loader as productDataLoader } from "./components/Product";
import CustomerForm from "./components/CustomerForm";
import { action as customerAction } from "./components/CustomerForm";
import Customer, { loader as customerLoader } from "./components/Customer";
import Account ,{loader as accountLoader}from "./components/Account";
import App from "./App";
import UpdateProduct, {
  action as updateProductAction,
  loader as updateProductLoader,
} from "./components/UpdateProduct";
import axios from "axios";
import { getSellerId, getUrl } from "./utils/api";
import UpdateCustomer, {
  loader as updateCustomerLoader,
  action as updateCustomerAction,
} from "./components/UpdateCustomer";
import Messages from "./components/Messages";


import SellerList, {
  loader as adminSellerLoader,
} from "./components/admin/SellerList";
import AddSellerAccount from "./components/admin/AddSellerAccount";
import CustomerList, {
  loader as customerAdminLoader,
} from "./components/admin/CustomerList";

import AddCustomer,{action as adminCustomerAction} from "./components/admin/AddCustomer";
import  AdminUpdateCustomer,{loader as adminUpdateCustomerLoader, action as adminUpdateCustomerAction} from "./components/admin/AdminUpdateCustomer";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<><div className="w-full text-center">404 Page not found</div></>,
    loader: async () => {
      const data1 = await axios.get(
        `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`
      );
      console.log(data1.data[0].currentUser != "admin");
      if (
        data1.data[0].currentUser == "" &&
        data1.data[0].currentUser != "admin"
      ) {
        return redirect("http://localhost:5173/login");
      }
      console.log(data1);

      const data = await customerLoader();
      return data;
    },
    children: [
      {
        index: true,
        element: <Customer></Customer>,
        loader:async()=>{
           const data = await customerLoader();
           return data;
        }
      },
      {
        path: "customerForm",
        element: <CustomerForm></CustomerForm>,
        action: async ({ request }) => {
          await customerAction(await request.formData());
          return redirect("..");
        },
      },
      {
        path: "customerupdate",
        children: [
          {
            path: ":id",
            element: <UpdateCustomer></UpdateCustomer>,
            loader: async (req) => {
              return await updateCustomerLoader(req.params.id);
            },
            action: async ({ request, params }) => {
              const formdata = await request.formData();
              await updateCustomerAction(formdata, params.id);
              return redirect("/");
            },
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Product></Product>,
            loader: async () => {
              return await productDataLoader();
            },
          },
          {
            path: "form",
            element: <ProductForm></ProductForm>,
            action: async ({ request }) => {
              const formdata = await request.formData();
              await productAction(formdata);
              return redirect("/products");
            },
          },
          {
            path: "update/:id",
            element: <UpdateProduct></UpdateProduct>,
            loader: async (req) => {
              const { id } = req.params;
              return await updateProductLoader(id);
            },
            action: async ({ request, params }) => {
              console.log(request.method);
              if (request.method == "DELETE") {
                console.log("scs");
                await axios.delete(getUrl() + `product/${params.id}`);
                const wait = new Promise((resolve) => {
                  return setTimeout(() => {
                    resolve("success");
                  }, 2000);
                });
                await wait;
              } else {
                const formdata = await request.formData();
                await updateProductAction(formdata, params.id);
              }
              return redirect("/products");
            },
          },
        ],
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: async () => {
          const sellerid = await getSellerId();
          console.log(sellerid);
          const data = await axios.get(`${getUrl()}orders/` + sellerid);
          console.log(data.data);
          return data.data;
        },
      },
      {
        path: "account",
        element: <Account></Account>,
        loader: async () => {
          return await accountLoader();
        },
      },
      {
        path: "messages",
        element: <Messages></Messages>,
      },
      {
        path: "logout",
        loader: async () => {
          await axios.patch(
            `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`,
            { currentUser: "" }
          );

          return redirect("http://localhost:5173/login");
        },
      },
      {
        path: "admin",
        element: (
          <>
            <Outlet></Outlet>
          </>
        ),
        loader: async () => {
          const data1 = await axios.get(
            `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`
          );
          console.log(data1.data[0]);
          if (data1.data[0].currentUser != "admin") {
            return redirect("http://localhost:5173/login");
          }

          return null;
        },

        children: [
          {
            path: "main",
            element: <CustomerList></CustomerList>,
            loader: async () => {
              const data = await customerAdminLoader();
              return data;
            },
          },
          {
            path: "sellers",
            element: <SellerList></SellerList>,
            loader: async () => {
              const data = await adminSellerLoader();
              return data;
            },
          },
          {
            path: "AddSeller",
            element: <AddSellerAccount></AddSellerAccount>,
            action: () => {
              return redirect("../sellers");
            },
          },
          {
            path: "addCustomer",
            element: <AddCustomer></AddCustomer>,
            action: async ({ request }) => {
              await adminCustomerAction(await request.formData());
              return redirect("/admin/main");
            },
          },
          {
            path: "updateCustomer/:id",
            element: <AdminUpdateCustomer></AdminUpdateCustomer>,
            loader: async (req) => {
              return await adminUpdateCustomerLoader(req.params.id);
            },
            action: async ({ request, params }) => {
              const formdata = await request.formData();
              await adminUpdateCustomerAction(formdata, params.id);
              return redirect("/admin/main");
            },
          },
          {
            path: "logout",
            loader: async () => {
              await axios.patch(
                `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`,
                { currentUser: "" }
              );

              return redirect("http://localhost:5173/login");
            },
          },
        ],
      },
    ],
  },
]);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css'
import App from './App.jsx'
import Layout from './UserInterface/Layout.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Cancel from "./pages/Cancel.jsx";
import Cart from "./pages/Cart.jsx";
import Category from "./pages/Category.jsx";
import Favorite from "./pages/Favorite.jsx";
import NotFound from "./pages/NotFound.jsx";
import Orders from "./pages/Orders.jsx";
import Product from "./pages/Product.jsx";
import Success from "./pages/Success.jsx";
import Account from "./pages/Account.jsx";


const RouterLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/account",
        element: <Account/>
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

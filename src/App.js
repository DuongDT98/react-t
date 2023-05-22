import React, { lazy, Suspense } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/index";
import ROUTES from "./constant/routers.constant";

const Home = lazy(() => import("./containers/home/index"));
const Shops = lazy(() => import("./containers/shops/index"));
const Customer = lazy(() => import("./containers/customer/index"));
const Product = lazy(() => import("./containers/product/index"));
const Carts = lazy(() => import("./containers/carts/index"));

const routes = [
  { path: ROUTES.MAIN.HOME, component: Home, exact: true },
  { path: ROUTES.MAIN.SHOP, component: Shops, exact: true },
  { path: ROUTES.MAIN.CUSTOMER, component: Customer, exact: true },
  { path: ROUTES.MAIN.PROD, component: Product, exact: true },
  { path: ROUTES.MAIN.CARTS, component: Carts, exact: true },
];

const App = ({ history }) => (
  <>
    <Router history={history}>
      <Suspense fallback={<div> </div>}>
        <Switch>
          <MainLayout>
            {routes.map((i) => (
              <Route
                key={String(i.path)}
                exact={i.exact}
                path={i.path}
                component={i.component}
              />
            ))}
          </MainLayout>
        </Switch>
      </Suspense>
    </Router>
    <ToastContainer
      key="toast"
      hideProgressBar
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      autoClose={3000}
      position="top-right"
    />
  </>
);
export default App;

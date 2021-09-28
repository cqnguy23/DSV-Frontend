import FooterComponent from "./components/Footer";
import "./App.less";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { Divider } from "antd";
import UserPage from "./pages/UserPage";
import ScrollToTop from "../src/utils/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Switch>
            <Route path="/admin">
              <Switch>
                <Route exact path="/admin/login" component={AdminLoginPage} />
                <ProtectedRoute
                  path="/admin/dashboard"
                  component={AdminDashboardPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Route>
            <Route path="/">
              <NavBar />
              <Divider
                style={{
                  marginTop: "14px",
                  marginBottom: "35px",
                  objectFit: "contain",
                  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.08)",
                }}
              />

              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                  exact
                  path="/products/:gender"
                  component={ProductsPage}
                />
                <Route path="/user" component={UserPage} />
                <Route
                  exact
                  path="/products/:gender/:id"
                  component={SingleProductPage}
                />
                <Route exact path="/cart" component={CartPage} />
                <Route component={NotFoundPage} />
              </Switch>
              <FooterComponent />
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;

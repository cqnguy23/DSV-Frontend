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

function App() {
  return (
    <>
      <Router>
        <NavBar />
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
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/products/gender/:gender"
            component={ProductsPage}
          />
          <Route
            exact
            path="/products/gender/:gender/:id"
            component={SingleProductPage}
          />
          <Route exact path="/cart" component={CartPage} />
        </Switch>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;

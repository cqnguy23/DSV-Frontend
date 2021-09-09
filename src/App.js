import FooterComponent from "./components/Footer";
import "./App.less";
import NavBar from "./components/NavBar";
import WomenProductsPage from "./pages/WomenProductsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenProductsPage from "./pages/MenProductsPage";

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
          <Route exact path="/products/women" component={WomenProductsPage} />
          <Route exact path="/products/men" component={MenProductsPage} />
          <Route exact path="/products/:id" component={SingleProductPage} />
        </Switch>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;

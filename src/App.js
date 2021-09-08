import FooterComponent from "./components/Footer";
import "./App.less";
import NavBar from "./components/NavBar";
import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:id" component={SingleProductPage} />
        </Switch>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;

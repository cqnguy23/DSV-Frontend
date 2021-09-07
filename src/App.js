import Footer from "./components/Footer";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:id" component={SingleProductPage} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;

import React from "react"
import { Provider } from "react-redux";
import ProductForm from "./Products/ProductForm"
import ProductsList from "./Products/ProductsList"
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <ProductsList />
        <ProductForm />
      </div>
    </Provider>
  )
}

export default App;
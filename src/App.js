import Card from "./components/card";
import CardClassComponent from "./components/card/card-class-component";
import { products } from "./fixtures/products";

import './App.css';

const product = products[0];

function App() {
  return (
    <>
      <CardClassComponent />
      <Card {...product} />
    </>

  );
}

export default App;

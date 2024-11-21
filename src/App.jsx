import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Container from './UserInterface/Container.jsx';
import { fetchAllProducts } from './constants/apis.js';
import HighlightedProduct from './UserInterface/HighlightedProduct.jsx';
import CategoriesView from './UserInterface/CategoriesView.jsx';
import FeaturedProducts from './UserInterface/FeaturedProducs.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    })();
  }, []);

  const highlightProduct = products.length
    ? products
      .filter((product) => product.category !== "groceries") // Exclude groceries
    [Math.floor(Math.random() * products.filter((product) => product.category !== "groceries").length)]
    : null;

  const featuredProducts = products.filter((product) => product.category !== "groceries"); // Filtered list


  return (
      <Container>
        <HighlightedProduct product={highlightProduct} />
        <CategoriesView />
        <FeaturedProducts products={featuredProducts}/>
      </Container>
  )
}

export default App;

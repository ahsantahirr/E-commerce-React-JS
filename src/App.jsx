import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';

function App() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => setProduct(products));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Filter products based on both search text and selected category
  const filteredProducts = product.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || data.title.toLowerCase().includes(category.toLowerCase()))
  );

  return (
    <>
      <Navbar onChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <div className="flex flex-wrap gap-5 justify-center mt-10">
        {filteredProducts.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            image={data.image}
            price={data.price}
            description={data.description}
            ratings={data.rating.rate}
          />
        ))}
      </div>
    </>
  );
}

export default App;

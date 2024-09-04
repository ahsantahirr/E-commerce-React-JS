import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import EcommerceCard from '../components/Card'
import { useOutletContext } from 'react-router-dom';
import CategoryChip from '../components/CategoryChip';

function App() {
  const [product, setProduct] = useState([]);
  const { search, category } = useOutletContext();
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [choosenCategory, setChoosenCategory] = useState("All")
  // const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");

  useEffect(() => {
    const url =
      choosenCategory == "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${choosenCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products)
        setLoading(false)
      });
  }, [choosenCategory]);
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then((data) => {
        setCategories(data)
        setLoading(false)
      });
  }, [])

  // const fetchData = () => {
  //   const url =
  //     choosenCategory == "All"
  //       ? "https://dummyjson.com/products"
  //       : `https://dummyjson.com/products/category/${choosenCategory}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data.products)
  //       setLoading(false)
  //     });
  // };


  //  const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleCategoryChange = (e) => {
  //   setCategory(e.target.value);
  // };

  // Filter products based on both search text and selected category
  const filteredProducts = product.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || data.title.toLowerCase().includes(category.toLowerCase()))
    && 
    product.sort((a, b) => a.title.localeCompare(b.title))
  );
  // const sorttedProducts = product.sort((a, b) => a.title.localeCompare(b.title))
  return (
    <>
      {loading ? (<div className='flex justify-center'><ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#ffca28"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /></div>) : (<div className='flex flex-wrap mt-10 ml-4'>
        <CategoryChip onClick={() => setChoosenCategory("All")} isChosen={choosenCategory === "All"} title={"All"} />
        {categories.map((category) => (
          <CategoryChip
            isChosen={choosenCategory === category.slug}
            onClick={() => setChoosenCategory(category.slug)}
            key={category.slug}
            title={category.name} />))}
      </div>)}


      <div className="flex flex-wrap gap-5 justify-center mt-10 shadow-2xl">
        {filteredProducts.map((data) => (
          <EcommerceCard
            ID={data.id}
            key={data.id}
            title={data.title}
            image={data.thumbnail}
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




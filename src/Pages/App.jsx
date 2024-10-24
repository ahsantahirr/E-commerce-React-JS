import { useEffect, useState, useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import EcommerceCard from '../components/Card';
import CategoryChip from '../components/CategoryChip';
import { themeContext } from '../Contexts/Themecontext';
import { Pagination, ConfigProvider } from 'antd';
import Hero from '../components/Hero';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState('All');
  const { theme } = useContext(themeContext);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(20);
  const [total, setTotal] = useState(20);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('titleAsc'); // New state for sorting

  // Fetch products based on category and pagination
  useEffect(() => {
    setLoading(true);
    const url =
      choosenCategory === 'All'
        ? `https://dummyjson.com/products?limit=30&skip=${skip}`
        : `https://dummyjson.com/products/category/${choosenCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [choosenCategory, skip]);

  // Fetch product categories
  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products based on search input
  const filteredProducts = products
    .filter((data) =>
      data.title.toLowerCase().includes(search.toLowerCase())
    );

  // Sort products based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'titleDesc':
        return b.title.localeCompare(a.title);
      case 'titleAsc':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (

    <>
      <Hero onChange={(e) => setSearch(e.target.value)} />
      {loading ? (
        <div className="flex justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#849b87']}
          />
        </div>
      ) : (
        <>


          {/* Sort options */}
          <div className={`flex justify-end p-4 ${theme ? "bg-black" : "bg-white"}`}>
            <select
              className="p-2 border rounded-md "
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="titleAsc">Sort by Title (A-Z)</option>
              <option value="titleDesc">Sort by Title (Z-A)</option>
              <option value="priceAsc">Sort by Price (Low to High)</option>
              <option value="priceDesc">Sort by Price (High to Low)</option>
            </select>
          </div>

          <div className={`flex flex-wrap p-4 ${theme ? "bg-black text-white" : "bg-white"}`}>
            <CategoryChip
              onClick={() => setChoosenCategory('All')}
              isChosen={choosenCategory === 'All'}
              title={'All'}
            />
            {categories.map((category) => (
              <CategoryChip
                key={category.slug}
                isChosen={choosenCategory === category.slug}
                onClick={() => setChoosenCategory(category.slug)}
                title={category.name}
              />
            ))}
          </div>

          <div className={`flex flex-wrap p-4 gap-5 justify-center shadow-2xl ${theme ? "bg-black" : "bg-white"}`} >
            {sortedProducts.length > 0 ? (
              sortedProducts.map((data) => (
                // window.scrollTo({ top: 0, behavior: 'smooth' }),
                <EcommerceCard
                  key={data.id}
                  product={data}
                  title={data.title}
                  image={data.thumbnail}
                  price={data.price}
                  description={data.description}
                  ratings={data.rating}
                  ID ={data.id}
                />
              ))
            ) : (
              <p className={`${theme ? "text-white" : "text-black"}`}>No products found</p>
            )}
          </div>

          <ConfigProvider
  theme={{
    token: {
      // Add any custom theme configuration here
    },
  }}
>
  <Pagination
    className={`${theme ? "bg-black" : "bg-white"} p-4`}
    onChange={(num) => {
      // Scroll to the top of the page when changing the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSkip((num - 1) * limit); // Update pagination skip value
      setCurrent(num); // Update the current page number
    }}
    current={current}
    defaultCurrent={1}
    pageSize={limit}
    total={total}
  />
</ConfigProvider>


        </>
      )}
    </>
  );
}

export default App;

              //           colorPrimary: theme ? "#FFFFFF" : "#000000", // White for dark mode, black for light mode
              // paginationItemActiveBg: theme ? "#000000" : "#FFFFFF", // Black for dark mode, white for light mode
              // paginationItemActiveColor: theme ? "#fbbf24" : "#000000",


import { useEffect, useState, useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import EcommerceCard from '../components/Card';
import { useOutletContext } from 'react-router-dom';
import CategoryChip from '../components/CategoryChip';
import { themeContext } from '../Contexts/Themecontext';
import { Pagination } from 'antd';
function App() {
  const [product, setProduct] = useState([]);
  const { search, category } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState('All');
  const { theme } = useContext(themeContext)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(20);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    const url =
      choosenCategory === 'All'
        ? `https://dummyjson.com/products?limit=30&skip=${skip}`
        : `https://dummyjson.com/products/category/${choosenCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setTotal(data.total);

        setLoading(false);
      })
      .catch(() => setLoading(false)); // Set loading to false even if fetch fails
  }, [choosenCategory, skip]);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Set loading to false even if fetch fails
  }, []);

  const filteredProducts = product
    .filter((data) =>
      data.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title))
    ||
    (category === "" || data.title.toLowerCase().includes(category.toLowerCase()))

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#ffca28"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className={`flex flex-wrap mt-10 ml-4 ${theme ? ("bg-black text-white") : ("bg-white")} `}>
            <CategoryChip
              onClick={() => setChoosenCategory('All')}
              isChosen={choosenCategory === 'All'}
              title={'All'}
            />
            {categories.map((category) => (
              <CategoryChip
                isChosen={choosenCategory === category.slug}
                onClick={() => setChoosenCategory(category.slug)}
                key={category.slug}
                title={category.name}
              />
            ))}
          </div>

          <div className={`flex flex-wrap gap-5 justify-center mt-10 shadow-2xl ${theme ? ("bg-black") : ("bg-white")}`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((data) => (
                <EcommerceCard
                  product={data}
                  ID={data.id}
                  key={data.id}
                  title={data.title}
                  image={data.thumbnail}
                  price={data.price}
                  description={data.description}
                  ratings={data.rating.rate}
                />
              ))
            ) : (
              <p>No products found</p>
            )}
            <Pagination
            
             onChange={(num) => {
              setSkip((num - 1) * 20);
              setCurrent(num);
            }}
            current={current}
            defaultCurrent={1}
            pageSize={20}
            total={total}
          />
          </div>

        </>
      )}
    </>
  );
}

export default App;



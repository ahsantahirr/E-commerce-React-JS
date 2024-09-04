import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function Layout() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Handler functions
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Navbar onChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <Outlet context={{ search, category }} />
      <Footer/>
    </>
  );
}

export default Layout;

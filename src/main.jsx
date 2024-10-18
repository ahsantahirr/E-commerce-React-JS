import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import About from "./Pages/About"
import App from './Pages/App';
import ContactUs from './Pages/Contact';
import Productdetails from './Pages/Productdetails';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Orders from './Pages/Orders';
import AdminPanel from './Pages/AdminPanel';



import UserContextProvider from './Contexts/userContext';
import ThemeContextProvider from './Contexts/Themecontext';
// import CartSidebar from './components/CartSidebar'
import Cart from './Pages/Cart';
import Favorites from './Pages/Favourititems';
import CartContextProvider from './Contexts/Cartcontext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<ContactUs />} />
      <Route path='signin' element={<Signin />} />
      <Route path='signup' element={<Signup />} />
      <Route path='/product/:id' element={<Productdetails />} />
      <Route path='cart' element={<Cart />} />
      <Route path='orders' element={<Orders />} />
      <Route path='AdminPanel' element={<AdminPanel />} />
      <Route path='favourite' element={<Favorites />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
      <ThemeContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeContextProvider>
    </CartContextProvider>


  </StrictMode>
);

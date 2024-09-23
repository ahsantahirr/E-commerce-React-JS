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
import UserContextProvider from './Contexts/userContext';
import ThemeContextProvider from './Contexts/Themecontext';
import Cart from './Pages/Cart';
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

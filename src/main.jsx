import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import About from "./Pages/About"
import App from './Pages/App';
import ContactUs from './Pages/Contact';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path = '' element={<App />}/>
      <Route path='about' element={<About />} />
      <Route path='contact' element={<ContactUs />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import React from 'react'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { themeContext } from '../Contexts/Themecontext';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CartContext } from '../Contexts/Cartcontext'
function EcommerceCard({ title, image, price, description, ratings, ID, product }) {
  const { theme } = useContext(themeContext)
  const { addToCart, isItemAdded } = useContext(CartContext);

  return (

    <Card className={`w-96 h-full shadow-xl font-poppins cursor-pointer ${theme ? ("bg-black text-white") : ("bg-white")}`}  >
      <Link to={`/product/${ID}`}>
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
          />
        </CardHeader>
        <CardBody>
          <div className={`mb-2 flex items-center justify-between p-2 ${theme ? ("bg-black text-white") : ("bg-white")}`}>
            <Typography color="blue-gray" className="font-extrabold text-xl">
              {title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $ {price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className={`font-normal opacity-75 px-1 ${theme ? ("bg-black text-white") : ("bg-white")}`}
          >
            {description}
          </Typography>
        </CardBody>
      </Link>
      <CardFooter className="pt-0 flex justify-center">
        <Button
          ripple={false}
          fullWidth={true}
          className={`bg-blue-gray-900/10 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 hover:bg-black-500 mt-16 h-10 bg-black w-52 items-center ${theme ? "bg-white text-black" : ""}` }   
         onClick={() => addToCart(product)}>
          {isItemAdded(product.id)
            ? `Added (${isItemAdded(product.id).quantity})`
            : "Add to Cart"}


        </Button>
      </CardFooter>
    </Card>



  )
}

export default EcommerceCard
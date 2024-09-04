import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
function EcommerceCard({ title, image, price, description, ratings, ID }) {
  return (
    <Link to={`/product/${ID}`}>
      <Card className="w-96 h-screen shadow-2xl overflow-x-auto">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between p-2">
            <Typography color="blue-gray" className="font-medium">
              {title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $ {price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 px-1"
          >
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 hover:bg-amber-500 mt-16 h-10 bg-amber-400 w-52
         "
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>


  )
}

export default EcommerceCard
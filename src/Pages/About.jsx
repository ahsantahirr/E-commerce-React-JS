import React from 'react'
import test1 from '../assets/test1.jpeg'
function About() {
  return (
    <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us</title>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">About Us</h1>
      </div>
    </header>
    <main className="max-w-7xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700">
          At ReactStore, our mission is to provide the best products at
          the best prices while ensuring exceptional customer service.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Customer Satisfaction</li>
          <li>Quality Products</li>
          <li>Integrity</li>
          <li>Innovation</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src={test1}
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="font-bold">John Doe</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="font-bold">Jane Smith</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="font-bold">Alice Johnson</h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </section>
    </main>
    <footer className="bg-white shadow mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-600">
          © 2023 [Your Company Name]. All rights reserved.
        </p>
      </div>
    </footer>
  </>
  
  )
}

export default About


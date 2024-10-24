import { useContext, useState } from "react";
import { CartContext } from "../Contexts/Cartcontext";
import { themeContext } from "../Contexts/Themecontext"; // Import themeContext
import CheckOutModal from "../components/Checkoutmodal";
import ThankyouModal from "../components/ThankyouModal";
import { storage, db } from "../firebaseutils"; // Import storage and db from your Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { addDoc, collection } from "firebase/firestore"; // Firestore functions


function Cart() {
  const { cartItems, updateToCart, removeCart, clearCart, addToFavourite,  } = useContext(CartContext); // Include addToFavourite and isItemFavourite
  const { theme } = useContext(themeContext); // Get theme from themeContext
  const [isModalOpen, setIsModalOpen] = useState(false);
const [thankyoumodal, setthankyoumodal] = useState(false)
  const handleIncrease = (id) => {
    updateToCart(id, "plus");
  };

  const handleDecrease = (id) => {
    updateToCart(id, "minus");
  };

  const handleRemove = (id) => {
    removeCart(id); // Remove specific item
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkoutOrder = async (values) => {
    console.log("Form values: ", values);
    try {
      // Create a Firestore order document
      const orderData = {
        
        name: values.username,
        email: values.email,
        phone: values.number,
        address: values.address,
        subtotal,
        status: "pending",
        items: cartItems.map(item => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          thumbnail: "", // Placeholder for image URL
        })),
        createdAt: new Date(),
      };
  
      // Upload each item image to Firebase Storage and update order with image URLs
      for (const item of cartItems) {
        const imageRef = ref(storage, `orders/${values.email}/products/${item.id}`);
        const response = await fetch(item.thumbnail); // Fetch the image from its current URL
        const blob = await response.blob(); // Convert the image to a blob
        
        await uploadBytes(imageRef, blob); // Upload the image to Firebase Storage
        const imageUrl = await getDownloadURL(imageRef); // Get the uploaded image URL
  
        // Update the item's thumbnail with the Firebase Storage URL
        orderData.items = orderData.items.map(product =>
          product.title === item.title ? { ...product, thumbnail: imageUrl } : product
        );
      }
  
      // Add order to Firestore
      await addDoc(collection(db, "orders"), orderData);
  
      // Send the order summary to WhatsApp and clear the cart
      // const message = `
      //   *Order Summary*\n
      //   *Name:* ${values.username}
      //   *Email:* ${values.email}
      //   *Phone:* ${values.number}
      //   *Subtotal:* $${subtotal.toFixed(2)}
      //   *Status:* Pending\n
      //   *Items:*\n${orderData.items
      //     .map(
      //       (data, index) =>
      //         `${index + 1}. ${data.title} - $${data.price} (Qty: ${data.quantity})`
      //     )
      //     .join("\n")}\n
      //   *Total Amount:* $${subtotal.toFixed(2)}
      //   `;
      // const encodedTxt = encodeURIComponent(message.trim());
      // window.open(`https://wa.me/923428180120?text=${encodedTxt}`, "_blank");
      setthankyoumodal(true);
      clearCart();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const containerClass = theme ? "bg-black text-white" : "bg-white text-black";
  const borderClass = theme ? "border-gray-700" : "border-gray-200";
  const btnClass = theme
    ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
    : "border-gray-300 bg-gray-100 hover:bg-gray-200";

  return (
    <div>
      {thankyoumodal?<ThankyouModal/>:""}
      <section className={`py-8 antialiased md:py-16 ${containerClass}`}>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    window.scrollTo({ top: 0, behavior: 'smooth' }),
                    <div
                      key={item.id}
                      className={`rounded-lg border p-4 shadow-sm md:p-6 ${borderClass}`}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20"
                            src={item.thumbnail}
                            alt={item.name}
                          />
                        </a>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => handleDecrease(item.id)}
                              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-100 ${btnClass}`}
                              disabled={item.quantity <= 1}
                            >
                              <svg
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              className={`w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 ${containerClass}`}
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() => handleIncrease(item.id)}
                              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-100 ${btnClass}`}
                            >
                              <svg
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium hover:underline"
                          >
                            {item.name}
                          </a>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium hover:underline"
                              onClick={() => addToFavourite(item)} // Add to favorite onClick
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              {/* Conditionally render button text based on favorite status */}
                              Add to Favorites
                            </button>
                            <button
                              onClick={() => handleRemove(item.id)}
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                   
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className={`rounded-lg border p-6 shadow-sm ${borderClass}`}>
                <h2 className="text-lg font-medium">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">Subtotal</span>
                    <span className="text-base font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shipping</span>
                    <span className="text-sm font-bold">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full rounded-lg py-3 px-4 text-center text-base font-medium  hover:opacity-90 ${theme ? "text-black bg-white" : "bg-black text-white"}`}
                  onClick={showModal} // Show the modal on click
                >
                  Proceed to Checkout
                </button>

                <CheckOutModal
                  isModalOpen={isModalOpen}
                  handleOk={handleOk}
                  checkoutOrder={checkoutOrder}
                  handleCancel={handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;

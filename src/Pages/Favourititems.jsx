import { useContext } from "react";
import { CartContext } from "../Contexts/Cartcontext";
import { themeContext } from "../Contexts/Themecontext"; // Import themeContext

function Favorites() {
  const { favoriteItems, removeFavourite, addToCart } = useContext(CartContext); // Add removeFavourite and addToCart functions
  const { theme } = useContext(themeContext); // Get theme from themeContext

  const handleRemove = (id) => {
    removeFavourite(id); // Remove specific favorite item
  };

  const handleAddToCart = (item) => {
    addToCart(item); // Add item to the cart
  };
  console.log("Favorite items: ", favoriteItems);

  const containerClass = theme ? "bg-black text-white" : "bg-white text-black";
  const borderClass = theme ? "border-gray-700" : "border-gray-200";
  const btnClass = theme
    ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
    : "border-gray-300 bg-gray-100 hover:bg-gray-200";

  return (
    <div>
      <section className={`py-8 antialiased md:py-16 ${containerClass}`}>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold sm:text-2xl">Favorites</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Favorite Items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {favoriteItems ? (
                  favoriteItems.map((item) => (
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
                              onClick={() => handleAddToCart(item)} // Add to cart onClick
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
                                  d="M5.25 6.75 7.5 2.25h9l2.25 4.5M1.5 6.75h21l-2.25 13.5H3.75L1.5 6.75ZM15 11.25v6m-6-6v6"
                                />
                              </svg>
                              Add to Cart
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
                    You have no favorite items.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Favorites;

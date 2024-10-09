import { useContext } from "react";
import { CartContext } from '../Contexts/Cartcontext'

function Cart() {
  const { cartItems, updateToCart } = useContext(CartContext);

  const handleIncrease = (id) => {
    updateToCart(id, "plus");
    // Additional logic if needed when quantity increases
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} alt="" />
          <p>{item.title}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleIncrease(item.id)}>Increase Quantity</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;

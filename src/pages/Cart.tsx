
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import Spinner from "@/components/ui/Spinner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, syncing } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (items.length === 0) {
    return (
     <div className="pt-20 min-h-screen bg-gray-50">
  <Navigation />
  {syncing && (
        <div className="flex justify-center items-center py-2">
          <Spinner />
          <span className="text-sm text-gray-500 ml-2">Syncing your cart...</span>
        </div>
      )}
  <div className="flex flex-col items-center justify-center py-12">
    <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
    <Link to="/products" className="text-blue-500 hover:text-blue-600">
      Continue Shopping
    </Link>
  </div>
</div>

    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
  <Navigation />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
    <div className="bg-white rounded-lg shadow-sm p-6">
      {items.map((item) => (
        <div key={item.id} className="cart-item flex items-center py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</label>
<select
  id={`qty-${item.id}`}
  name="quantity"
  value={item.quantity}
  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
  className="rounded border p-1"
>
  {[1, 2, 3, 4, 5].map((num) => (
    <option key={num} value={num}>
      {num}
    </option>
  ))}
</select>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8">
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-4">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Navigation from '../components/Navigation';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Successfully Placed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. You will be redirected to the home page in 5 seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

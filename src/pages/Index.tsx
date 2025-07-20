
import Navigation from '../components/Navigation';
import ProductGrid from '../components/ProductGrid';


const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navigation />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FootwearStore</h1>
            <p className="text-lg text-gray-600 mb-8">Discover your perfect pair of shoes</p>
          </div>
          <ProductGrid />
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
    {/* Centered Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center text-center">
      <div>
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <p className="text-gray-600">Quality footwear for everyone</p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <a href="/terms" className="hover:text-blue-500">Terms of Service</a>
          <a href="/privacy" className="hover:text-blue-500">Privacy Policy</a>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <p>
          Email:
          <a href="mailto:terminatorkar98@gmail.com" className="text-gray-600 hover:text-blue-500">
            {" "}terminatorkar98@gmail.com
          </a>
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">Instagram</a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 mt-4 pt-2 text-sm text-center text-gray-500">
      © {new Date().getFullYear()} FootwearStore. All rights reserved.
    </div>

  </div>
</footer>
    </div>
  );
};

export default Index;



import Navigation from '../components/Navigation';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
          <ProductGrid />
        </div>
      </main>
    </div>
  );
};

export default Products;

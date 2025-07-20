import Navigation from "@/components/Navigation"; 

const About = () => {
  return (
    <>
      <Navigation /> 
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About FootwearStore</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to FootwearStore, your premier destination for quality footwear. We take pride in offering a diverse collection of shoes that combine style, comfort, and durability.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded with a passion for providing exceptional footwear solutions, FootwearStore has grown from a small local shop to a trusted online destination for shoe enthusiasts.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-6">
              We are committed to offering:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>High-quality footwear from trusted brands</li>
              <li>Exceptional customer service</li>
              <li>Competitive pricing</li>
              <li>Wide selection of styles and sizes</li>
              <li>Fast and reliable shipping</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Visit Us</h2>
            <p className="text-gray-700">
              We'd love to hear from you! Contact us through our contact page or visit our social media channels to stay updated with our latest collections and offers.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;

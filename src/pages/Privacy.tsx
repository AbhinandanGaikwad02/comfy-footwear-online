import Navigation from "@/components/Navigation";

const Privacy = () => {
  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At FootwearStore, we value your privacy. This policy explains how we collect, use, and protect your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information such as your name, email address, and order details when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
        <p className="mb-4">
          We use your data to process orders, improve our services, and send updates (only if you opt-in).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Data</h2>
        <p className="mb-4">
          We never sell your personal data. We may share it only with trusted service providers who help us operate our business.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data. You can contact us anytime for such requests.
        </p>
      </div>
    </>
  );
};

export default Privacy;

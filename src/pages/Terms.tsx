import Navigation from "@/components/Navigation";

const Terms = () => {
  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          By using FootwearStore, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Our Service</h2>
        <p className="mb-4">
          You agree to use our services for lawful purposes only. Any misuse, tampering, or unauthorized access is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibility</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account information and activities on your account.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Product Availability</h2>
        <p className="mb-4">
          Product availability may vary, and we reserve the right to discontinue or modify any product at any time without notice.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
        <p className="mb-4">
          These terms may be updated from time to time. Continued use of the site constitutes acceptance of the updated terms.
        </p>
      </div>
    </>
  );
};

export default Terms;

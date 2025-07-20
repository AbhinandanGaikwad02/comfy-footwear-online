import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import Navigation from "@/components/Navigation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    emailjs
  .send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    },
    import.meta.env.VITE_EMAILJS_USER_ID
  )
      .then(
        () => {
          toast.success("Message sent! We'll get back to you soon.");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email sending failed:", error);
          toast.error("Failed to send message. Try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left Info Box */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Contact FootwearStore</h2>
            <p className="text-gray-600">
              We'd love to hear from you! Reach out to us for any queries or feedback.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">📍 Address</h4>
                <p className="text-gray-600">
                  Jain College of Engineering, Hebballi Rd, Hubballi, KA 580032
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">📞 Phone</h4>
                <p className="text-gray-600">
                  <a href="tel:+917406164605" className="hover:underline">
                    +91 74061 64605
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">📧 Email</h4>
                <p className="text-gray-600">
                  <a href="mailto:terminatorkar98@gmail.com" className="hover:underline">
                    terminatorkar98@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Spinner />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Optional Map Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.675652407328!2d75.1182853!3d15.3940425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d0e7c892f329%3A0x437f4bb22c9d71b6!2sJain%20College%20of%20Engineering%20%26%20Technology%20Hubballi!5e0!3m2!1sen!2sin!4v1745061847636!5m2!1sen!2sin"
            width="100%"
            height="400"
            className="rounded-md border-0 shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;

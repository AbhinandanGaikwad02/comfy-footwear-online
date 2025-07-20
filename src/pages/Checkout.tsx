
import { useCart } from "@/hooks/useCart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
});
type CheckoutFormData = z.infer<typeof schema> & { email: string };

const Checkout = () => {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
  });

  // Load PayPal script
  useEffect(() => {
  if (!showPayPal || !formData) return;

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  if (!clientId) {
    console.error("❌ Missing PayPal Client ID!");
    return;
  }

  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
  script.async = true;

  script.onload = () => {
    // @ts-ignore
    window.paypal.Buttons({
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.toFixed(2),
              },
            },
          ],
        });
      },
      onApprove: async (_data: any, actions: any) => {
        const details = await actions.order.capture();

        const { error } = await supabase.from("orders").insert([{
  name: formData.name,
  email: formData.email,  
  phone: formData.phone,
  address: formData.address,
  items: items,
  total: Number(total.toFixed(2)),
  user_id: user?.id || null,
  payment_status: "paid",
  payment_provider: "paypal",
  transaction_id: details.id,
  status:  "Pending",
}]);


        if (error) {
          console.error("Error saving order:", error.message);
          alert("Failed to save order.");
        } else {
          clearCart();
          navigate("/payment-success");
        }
      },
      onError: (err: any) => {
        console.error("❌ PayPal error:", err);
        alert("Payment failed.");
      },
    }).render(paypalRef.current);
  };

  document.body.appendChild(script);
}, [showPayPal, formData, total, items, user, navigate, clearCart]);


  const onSubmit = (data: CheckoutFormData) => {
  if (!user?.email) {
    alert("User email missing. Please log in.");
    return;
  }

  setFormData({ ...data, email: user.email }); // ✅ Add email into formData
  setShowPayPal(true);
};

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* 🛒 Cart Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Your Cart:</h3>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
            <li className="flex justify-between font-bold pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>

      {/* 📝 Checkout Form */}
      {!showPayPal && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Full Name</label>
            <input {...register("name")} className="border rounded px-3 py-2 w-full" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label>Phone</label>
            <input {...register("phone")} className="border rounded px-3 py-2 w-full" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label>Address</label>
            <textarea {...register("address")} className="border rounded px-3 py-2 w-full" />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {/* ✅ PayPal Buttons */}
      {showPayPal && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
          <div ref={paypalRef}></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

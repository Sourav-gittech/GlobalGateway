import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import CartHeader from '../../../Components/user/cart/CartHeader';
import EmptyCart from '../../../Components/user/cart/EmptyCart';
import CartHeaderWithAction from '../../../Components/user/cart/CartHeaderWithAction';
import CartItemCard from '../../../Components/user/cart/CartItemCard';
import ImportantNotes from '../../../Components/user/cart/ImportantNotes';
import PaymentSummaryCard from '../../../Components/user/cart/PaymentSummaryCard';
import SecurityTrust from '../../../Components/user/cart/SecurityTrust';
import TrustBadage from '../../../Components/user/cart/TrustBadage';
import SupportCard from '../../../Components/user/cart/SupportCard';
import SupportModal from '../../../Components/user/cart/SupportModal';

// Static cart items for production demo
const staticCartItems = [
  {
    id: 1,
    course_name: "Study Visa Consultation - Complete Package",
    description: "End-to-end visa application support with document review, interview prep, and post-visa assistance",
    price: "15000",
    img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    duration: "10 hours",
    lectures: 15,
    skillLevel: "Advanced",
    category: "Study Visa",
    deliveryTime: "Instant Access",
    includes: ["Document Review", "Mock Interview", "Email Support"]
  },
  {
    id: 2,
    course_name: "IELTS Preparation - Band 7+ Guaranteed",
    description: "Comprehensive IELTS training with expert tutors, practice tests, and personalized feedback",
    price: "12000",
    img_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    duration: "8 hours",
    lectures: 12,
    skillLevel: "Intermediate",
    category: "Language Test",
    deliveryTime: "Instant Access",
    includes: ["Practice Tests", "Speaking Sessions", "Writing Feedback"]
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(staticCartItems);
  const [discount, setDiscount] = useState(0);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
  const discountAmount = Math.round(subtotal * (discount / 100));
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const total = subtotal - discountAmount + tax;

  const navigateBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Professional Header with Trust Indicators */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
          <button
            onClick={navigateBack}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>

          <CartHeader cartItems={cartItems} total={total} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        {cartItems.length === 0 ? (

          // Empty Cart - Professional
          <EmptyCart navigateBack={navigateBack} />
        ) : (
          // Cart with Items - Production Ready
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header with Actions */}
              <CartHeaderWithAction cartItems={cartItems} setCartItems={setCartItems} />

              {/* Cart Items */}
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <CartItemCard key={item.id} item={item} index={index} setCartItems={setCartItems} cartItems={cartItems} />
                ))}
              </AnimatePresence>

              {/* Important Notes */}
              <ImportantNotes />
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-5">
                {/* Main Summary Card */}
                <PaymentSummaryCard cartItems={cartItems} subtotal={subtotal} tax={tax} total={total} discountAmount={discountAmount} discount={discount} setDiscount={setDiscount} />

                {/* Security & Trust */}
                <SecurityTrust />

                {/* Support Card */}
                <SupportCard setShowSupportModal={setShowSupportModal} />

                {/* Trust Badge */}
                <TrustBadage />

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <SupportModal setShowSupportModal={setShowSupportModal} />
      )}

      <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Cart;
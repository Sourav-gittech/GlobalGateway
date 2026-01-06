import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Trash2, ArrowRight, ArrowLeft, Clock, Video, Tag, Shield, 
  CheckCircle, Package, Award, Sparkles, X, Phone, Mail, MessageCircle,
  CreditCard, Lock, Banknote, Globe, FileCheck, Users, Star, AlertCircle,
  Info, Headphones, Calendar, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  
  // Live Chat States
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your visa support assistant. How can I help you today?",
      sender: 'agent',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
  const discountAmount = Math.round(subtotal * (discount / 100));
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const total = subtotal - discountAmount + tax;

  const handleRemoveFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from cart?')) {
      setCartItems([]);
    }
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (code === 'SAVE10' || code === 'FIRST10') {
      setDiscount(10);
      setPromoApplied(true);
    } else if (code === 'SAVE20' || code === 'WELCOME20') {
      setDiscount(20);
      setPromoApplied(true);
    } else if (code === 'STUDENT15') {
      setDiscount(15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Please check and try again.');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  const handleProceedToBuy = () => {
    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions and Refund Policy to continue.');
      return;
    }
    alert(`Processing secure payment of ₹${total.toLocaleString('en-IN')}\n\nYou will be redirected to our secure payment gateway.`);
  };

  // Live Chat Functions
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const response = generateAutoResponse(inputMessage);
      const agentMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'agent',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAutoResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('visa') || msg.includes('study')) {
      return "I'd be happy to help with visa applications! We offer comprehensive study visa consultation including document preparation, interview guidance, and application tracking. Would you like more details about our services?";
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('fee')) {
      return "Our services range from ₹8,000 to ₹18,000 depending on the complexity. We currently have special offers - use code SAVE20 for 20% off! Would you like to know about a specific service?";
    } else if (msg.includes('ielts') || msg.includes('test') || msg.includes('exam')) {
      return "Our IELTS preparation course guarantees Band 7+ scores! It includes mock tests, speaking practice sessions, and personalized feedback. The course is ₹12,000 with instant access. Interested?";
    } else if (msg.includes('payment') || msg.includes('pay')) {
      return "We accept all major payment methods: Credit/Debit Cards, UPI, Net Banking, and Digital Wallets. All transactions are 100% secure with SSL encryption. You'll get instant access after payment!";
    } else if (msg.includes('refund') || msg.includes('money back')) {
      return "We offer a 30-day money-back guarantee on all our services! If you're not satisfied, you can request a full refund within 30 days of purchase. No questions asked.";
    } else if (msg.includes('time') || msg.includes('duration') || msg.includes('long')) {
      return "Most of our courses provide lifetime access! Consultation sessions can be scheduled within 24 hours of purchase. Course durations vary from 6-10 hours of content. What specific timeline are you looking for?";
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! Welcome to our visa support chat. I'm here to help you with any questions about our services, pricing, or the visa application process. What would you like to know?";
    } else if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! Is there anything else I can help you with today? I'm here to make your visa journey smooth and successful! 😊";
    } else {
      return "That's a great question! For detailed information about this, I'd recommend speaking with one of our visa experts. You can call us at +91 1800-000-000 or email support@visaexpert.com. Is there anything specific about our services I can help clarify?";
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  const quickReplies = [
    "What visa services do you offer?",
    "How much does it cost?",
    "Tell me about IELTS prep",
    "What's your refund policy?"
  ];

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
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Shopping Cart
                  </h1>
                  <p className=" mt-2 text-white/70 text-sm mt-1">Secure Checkout</p>
                </div>
              </div>
              <p className=" ml-17 text-white/80 text-base sm:text-lg mt-4">
                {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} selected • Ready to proceed
              </p>
              
              {/* Trust Indicators */}
             
            </div>
            
            {cartItems.length > 0 && (
              <div className="hidden lg:flex items-center justify-end gap-6">
                <div className="text-right">
                  <p className="text-white/60 text-sm mb-1">Total Amount</p>
                  <p className="text-4xl font-bold">₹{total.toLocaleString('en-IN')}</p>
                  <p className="text-white/70 text-xs mt-1">Inclusive of all taxes</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        {cartItems.length === 0 ? (
          // Empty Cart - Professional
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 sm:p-16 text-center border border-slate-200"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-slate-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
              Start your visa journey by exploring our expert consultation services and preparation courses.
            </p>
            
            {/* Popular Services Suggestions */}
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Services</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Globe className="w-8 h-8 text-[#FF5252] mb-2" />
                  <h4 className="font-semibold text-sm mb-1">Study Visa</h4>
                  <p className="text-xs text-slate-600">Complete guidance</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <FileCheck className="w-8 h-8 text-[#FF5252] mb-2" />
                  <h4 className="font-semibold text-sm mb-1">IELTS Prep</h4>
                  <p className="text-xs text-slate-600">Band 7+ guaranteed</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Users className="w-8 h-8 text-[#FF5252] mb-2" />
                  <h4 className="font-semibold text-sm mb-1">Work Permit</h4>
                  <p className="text-xs text-slate-600">Expert assistance</p>
                </div>
              </div>
            </div>

            <button
              onClick={navigateBack}
              className="bg-gradient-to-r from-[#FF5252] to-[#E63946] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Explore Our Services
            </button>

            {/* Support Contact */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">Need help choosing the right service?</p>
              <button
                onClick={() => setShowChat(true)}
                className="text-[#FF5252] font-semibold text-sm hover:text-[#E63946] transition-colors inline-flex items-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                Talk to our visa experts
              </button>
            </div>
          </motion.div>
        ) : (
          // Cart with Items - Production Ready
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header with Actions */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Your Selected Services
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} • Review before checkout
                    </p>
                  </div>
                  {cartItems.length > 1 && (
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-5 sm:p-6 border border-slate-200 group"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-52 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden">
                        <img 
                          src={item.img_url} 
                          alt={item.course_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-[#FF5252] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-lg">
                          Item {index + 1}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-semibold px-2.5 py-1.5 rounded-lg">
                          {item.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-tight">
                              {item.course_name}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all flex items-center justify-center"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Service Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex flex-wrap gap-2">
                            {item.includes.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-medium border border-emerald-200">
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                {feature}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {item.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Video className="w-4 h-4 text-slate-400" />
                              {item.lectures} sessions
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-slate-400" />
                              {item.skillLevel}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {item.deliveryTime}
                            </span>
                          </div>
                        </div>

                        {/* Price & Guarantee */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Service Fee</p>
                            <p className="text-3xl font-bold text-[#FF5252]">
                              ₹{parseInt(item.price).toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                              <Shield className="w-4 h-4" />
                              <span className="font-semibold">Money-back Guarantee</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-2">Important Information:</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Instant access to course materials after payment</li>
                      <li>• Consultation sessions can be scheduled within 24 hours</li>
                      <li>• All services include email support for 6 months</li>
                      <li>• 30-day money-back guarantee applies to all purchases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-5">
                {/* Main Summary Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5252] to-[#E63946] flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Order Summary
                      </h2>
                      <p className="text-xs text-slate-600">Review your purchase</p>
                    </div>
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600 bg-green-50 -mx-2 px-2 py-2 rounded-lg">
                        <span className="flex items-center gap-2 font-medium">
                          <Tag className="w-4 h-4" />
                          Discount ({discount}%)
                        </span>
                        <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-slate-700">
                      <span className="flex items-center gap-1">
                        GST (18%)
                        <Info className="w-3 h-3 text-slate-400" />
                      </span>
                      <span className="font-semibold">₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 -mx-6 px-6 py-5 mb-6 border-y border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-slate-900">
                          ₹{total.toLocaleString('en-IN')}
                        </p>
                      </div>
                      {promoApplied && (
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-semibold bg-green-100 px-3 py-1.5 rounded-full">
                            Saved ₹{discountAmount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="mb-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#FF5252] border-slate-300 rounded focus:ring-[#FF5252]"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-[#FF5252] font-semibold hover:underline">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-[#FF5252] font-semibold hover:underline">Refund Policy</a>
                      </span>
                    </label>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: agreeTerms ? 1.02 : 1 }}
                    whileTap={{ scale: agreeTerms ? 0.98 : 1 }}
                    onClick={handleProceedToBuy}
                    disabled={!agreeTerms}
                    className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-base mb-4 ${
                      agreeTerms
                        ? 'bg-gradient-to-r from-[#FF5252] to-[#E63946] text-white hover:shadow-xl cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    Buy Now - ₹{total.toLocaleString('en-IN')}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Payment Methods */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-600 font-semibold mb-2">Accepted Payment Methods</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-700">
                        <CreditCard className="w-3 h-3 inline mr-1" />Cards
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-700">
                        <Banknote className="w-3 h-3 inline mr-1" />UPI
                      </div>
                     
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4 border-t border-slate-200">
                    <label className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#FF5252]" />
                      Have a promo code?
                    </label>
                    {!promoApplied ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:border-transparent text-sm uppercase"
                        />
                        <button 
                          onClick={handleApplyPromo}
                          className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-semibold"
                        >
                          Apply
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-bold text-green-800">
                            {promoCode} Applied!
                          </span>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-green-700 hover:text-green-900 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">
                      Try: SAVE10, WELCOME20, STUDENT15
                    </p>
                  </div>
                </div>

                {/* Security & Trust */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-5 border border-emerald-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    100% Secure & Trusted
                  </h3>
                  <div className="space-y-2.5 text-sm text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>PCI DSS compliant payment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Verified by 10,000+ students</span>
                    </div>
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-5 border border-blue-200">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-blue-600" />
                    Need Help?
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    Our visa experts are here to assist you
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowSupportModal(false);
                        setShowChat(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-white border border-blue-300 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Live Chat Support
                    </button>
                    <div className="flex gap-2 text-xs">
                      <a href="tel:+911800000000" className="flex-1 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                        <Phone className="w-3 h-3" />
                        Call Us
                      </a>
                      <a href="mailto:support@example.com" className="flex-1 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                        <Mail className="w-3 h-3" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700 ml-1">4.9/5</span>
                      </div>
                      <p className="text-xs text-slate-600">Rated by 2,500+ students</p>
                      <p className="text-xs text-emerald-600 font-semibold mt-1">98% Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Contact Support</h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Call Us</p>
                    <p className="text-sm text-slate-600">Mon-Sat, 9 AM - 7 PM</p>
                  </div>
                </div>
                <a href="tel:+911800000000" className="text-[#FF5252] font-bold text-lg hover:underline">
                  +91 1800-000-000
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email Us</p>
                    <p className="text-sm text-slate-600">24/7 Support</p>
                  </div>
                </div>
                <a href="mailto:support@visaexpert.com" className="text-[#FF5252] font-semibold hover:underline">
                  support@visaexpert.com
                </a>
              </div>

              <div className="bg-gradient-to-r from-[#FF5252] to-[#E63946] rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Live Chat</p>
                    <p className="text-sm text-white/90">Instant responses</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowSupportModal(false);
                    setShowChat(true);
                  }}
                  className="w-full bg-white text-[#FF5252] font-bold py-2.5 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Start Chat Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#FF5252] to-[#E63946] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          </span>
        </motion.button>
      )}

      {/* Live Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#FF5252] to-[#E63946] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Visa Support</h3>
                  <p className="text-white/90 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online now
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {chatMinimized ? (
                    <ArrowRight className="w-5 h-5 text-white rotate-90" />
                  ) : (
                    <ArrowLeft className="w-5 h-5 text-white rotate-90" />
                  )}
                </button>
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 bg-slate-50 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-[#FF5252] to-[#E63946] text-white'
                            : 'bg-white text-slate-900 border border-slate-200'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-300"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        inputMessage.trim()
                          ? 'bg-gradient-to-r from-[#FF5252] to-[#E63946] text-white hover:shadow-lg'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Powered by AI • Instant responses
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
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
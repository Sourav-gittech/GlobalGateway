import React from 'react'
import { BookOpen, CheckCircle, ShoppingCart, ArrowLeft, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ isPurchased, course, cartItems, setCartItems, setCartDrawer, setActiveTab }) => {

    const navigate = useNavigate();

    const addToCart = () => {
        if (!course) return;

        if (isPurchased) {
            alert('You have already purchased this course!');
            return;
        }

        const existing = cartItems.find(i => i.id === course.id);
        if (!existing) {
            const newCart = [...cartItems, course];
            setCartItems(newCart);
            localStorage.setItem('courseCart', JSON.stringify(newCart));
        }
        setCartDrawer(true);
    };

    return (
        <div className="lg:col-span-2">
            <div className=" bg-white/20 backdrop-blur-lg border border-white/50 rounded-2xl sticky top-4 shadow-lg overflow-hidden">

                {/* Image with Icon */}
                <div className="relative h-56">
                    {/* PURCHASED BADGE */}
                    {isPurchased && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Purchased
                        </div>
                    )}
                    <img src={course?.img_url} alt={course?.course_name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                </div>

                <div className="p-6">
                    {isPurchased ? (
                        <>
                            {/* Already Purchased Message */}
                            <div className="mb-5">
                                <p className="text-green-100 text-sm font-semibold mb-2 uppercase tracking-wider">Congratulations!</p>
                                <p className="text-2xl font-bold text-white mb-2">
                                    You Own This Course
                                </p>
                                <p className="text-white/80 text-sm">
                                    All course content is now unlocked and ready for you
                                </p>
                            </div>

                            {/* Access Course Button */}
                            <button
                                onClick={() => setActiveTab('content')}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg mb-4"
                            >
                                <BookOpen className="w-6 h-6" />
                                Access Course Content
                            </button>

                            {/* Go to Dashboard Button */}
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/30"
                            >
                                View in Dashboard
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Price */}
                            <div className="mb-5">
                                <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">Course Price</p>
                                <p className="text-5xl font-bold text-white">
                                    ₹{parseInt(course?.pricing)?.toLocaleString('en-IN')}
                                </p>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={addToCart}
                                className="w-full bg-red-400 hover:bg-[#E63946] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </button>
                        </>
                    )}
                    {/* Features */}
                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                        <div className="flex items-center text-green-500 text-sm font-medium">
                            <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span>30-day money-back guarantee</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm">
                            <Award className="w-5 h-5 mr-3 flex-shrink-0 text-[#FF5252]" />
                            <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm">
                            <Calendar className="w-5 h-5 mr-3 flex-shrink-0 text-[#FF5252]" />
                            <span>Lifetime access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingCard
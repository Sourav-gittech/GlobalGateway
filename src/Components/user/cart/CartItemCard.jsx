import React from 'react'
import { Award, Calendar, CheckCircle, Clock, Shield, Trash2, Video } from 'lucide-react'
import { motion } from 'framer-motion';

const CartItemCard = ({ item, index,setCartItems,cartItems }) => {

    const handleRemoveFromCart = (courseId) => {
        setCartItems(cartItems.filter(item => item.id !== courseId));
    };

    return (
        <motion.div
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
    )
}

export default CartItemCard
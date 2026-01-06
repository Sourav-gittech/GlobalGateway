import React from 'react'

const CartHeaderWithAction = ({ cartItems,setCartItems }) => {

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to remove all items from cart?')) {
            setCartItems([]);
        }
    };

    return (
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
    )
}

export default CartHeaderWithAction
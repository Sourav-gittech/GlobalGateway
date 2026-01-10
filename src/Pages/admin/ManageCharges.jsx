import React, { useEffect } from "react";
import AdditionalPaymentManagement from "../../Components/admin/charges/AdditionalPaymentManagement";
import PromoCodeManagement from "../../Components/admin/charges/PromoCodeManagement";
import PaymentChargesManagement from "../../Components/admin/charges/PaymentChargesManagement";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInUser } from "../../Redux/Slice/auth/checkAuthSlice";
import getSweetAlert from "../../util/alert/sweetAlert";
import ChargesHeader from "../../Components/admin/charges/ChargesHeader";
import SettingsChargeBox from "../../Components/admin/common/settings-charge-box/SettingsChargeBox";


// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function ManageCharges() {
  const dispatch = useDispatch();
  const { userAuthData, isUserLoading } = useSelector(state => state.checkAuth);

  useEffect(() => {
    dispatch(checkLoggedInUser()).catch(() => {
      getSweetAlert('Oops...', 'Something went wrong!', 'error');
    });
  }, [dispatch]);

  return (
    <div className="w-full space-y-6 ">
      {/* Header */}
      <ChargesHeader />

      {/* Payment Settings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <AdditionalPaymentManagement SettingsSection={SettingsChargeBox}/>

        <PaymentChargesManagement SettingsSection={SettingsChargeBox} Modal={Modal}/>
      </div>

      {/* Bottom Row - Discount Management Settings */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
        <PromoCodeManagement SettingsSection={SettingsChargeBox} Modal={Modal} />

      </div>

    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CourseDetailsHeader from '../../../../Components/user/course/course-details/CourseDetailsHeader';
import PricingCard from '../../../../Components/user/course/course-details/PricingCard';
import CourseContent from '../../../../Components/user/course/course-details/CourseContent';
import CartDrawer from '../../../../Components/user/course/course-details/CartDrawer';
import { decodeBase64Url } from '../../../../util/encodeDecode/base64';
import getSweetAlert from '../../../../util/alert/sweetAlert';
import { fetchCourseById } from '../../../../Redux/Slice/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, getOrCreateCart } from '../../../../Redux/Slice/cartSlice';
import { checkLoggedInUser } from '../../../../Redux/Slice/auth/checkAuthSlice';

const CourseDetails = () => {
  
  const { course_id } = useParams();
  const id = decodeBase64Url(course_id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartDrawer, setCartDrawer] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);
  const { isCourseLoading, currentCourse: course, hasCourseError } = useSelector(state => state?.course);
  const { isCartLoading, cartItems, currentCart, hasCartError } = useSelector(state => state?.cart);

  useEffect(() => {
    dispatch(fetchCourseById(id))
      .then(res => {
        // console.log('Response for fetching specific details', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, [id]);

  useEffect(() => {
    dispatch(getOrCreateCart(userAuthData?.id))
      .then(res => {
        // console.log('Response for getting cart details for specific user', res);

        dispatch(fetchCartItems(res?.payload?.id))
          .then(res => {
            // console.log('Response for fetching cart items', res);
          })
          .catch(err => {
            console.log(err);
            getSweetAlert('Oops...', 'Something went wrong!', 'error');
          })
      })
      .catch(err => {
        console.log(err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, [userAuthData]);

  useEffect(() => {
    dispatch(checkLoggedInUser())
      .then(res => {
        // console.log('Response for fetching user profile', res);
      })
      .catch((err) => {
        console.log("Error occurred", err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      });
  }, [dispatch]);

  // console.log('current course details', course);
  // console.log('User data', userAuthData);
  // console.log('Available cart items', cartItems);

  if (isCourseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF5252] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-[#556b7a] text-white shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
            <button onClick={() => navigate('/course')} className="flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Courses
            </button>

            <div className="grid lg:grid-cols-5  gap-8 items-start">
              <CourseDetailsHeader isPurchased={isPurchased} course={course} />
              {/* Price Card */}
              <PricingCard isPurchased={isPurchased} course={course} setCartDrawer={setCartDrawer} setActiveTab={setActiveTab} userId={userAuthData?.id} />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <CourseContent isPurchased={isPurchased} course={course} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Cart Drawer */}
      {cartDrawer && (
        <CartDrawer cartItems={cartItems} cartId={currentCart?.id} setCartDrawer={setCartDrawer} />
      )}
    </>
  );
};

export default CourseDetails;
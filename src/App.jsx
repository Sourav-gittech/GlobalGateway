import { useEffect } from 'react';
import './App.css';
import Routing from './Routing/Routing';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import LoadingAnimation from './Components/Loading';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from './Redux/Slice/loadingSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Start loader on app boot
    dispatch(startLoading('Initializing application...'));

    const timer = setTimeout(() => {
      dispatch(stopLoading());
    }, 3000); 

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      {/* GLOBAL LOADER */}
      <LoadingAnimation />

      {/* APP UI */}
      <ToastContainer />
      <Toaster />
      <Routing />
    </>
  );
}

export default App;

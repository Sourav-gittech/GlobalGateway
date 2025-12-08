import { useEffect, useState } from 'react';
import './App.css';
import Routing from './Routing/Routing';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import LoadingAnimation from './Components/Loading';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <ToastContainer />
      <Toaster />
      <Routing />
    </>
  );
}

export default App;
import Footer from '../components/Footer/Footer';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function DefaultLayout({ children }) {
  const scrollInView = useRef();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <Header />
      <div className='mt-[70px] min-h-screen'>{children}</div>
      <Footer />
    </>
  );
}
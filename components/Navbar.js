import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// import logoIcon from '../public/images/logo.jpg'

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`${isFixed ? 'scrolled-nav top-0 left-0 right-0 shadow-md' : ''} main-nav text-white transition-all duration-300 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <Image src={logoIcon} alt="NDDC Logo" width={50} height={50} /> */}
            <Link href="/">
                <img src="/images/logo.jpg" alt="NDDC Logo" style={{width: '170px'}} />
                {/* <img src="/images/logo-transparent.png" alt="NDDC Logo" style={{width: '170px'}} /> */}
            </Link>
          </div>
          <div className="anchor-links hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#about" className="hover:bg-teal-700 px-3 py-2 rounded-md text-[16px] font-normal">About</Link>
              <Link href="#why-host-an-intern" className="hover:bg-teal-700 px-3 py-2 rounded-md text-[16px] font-normal">Why Host an Intern?</Link>
              <Link href="#how-to-apply" className="hover:bg-teal-700 px-3 py-2 rounded-md text-[16px] font-normal">How to Apply</Link>
              <Link href="#contact" className="hover:bg-teal-700 px-3 py-2 rounded-md text-[16px] font-normal">Contact</Link>
            </div>
          </div>
          <div className="nav-link-btns">
            <Link href="/login" className="nav-sec-btn text-sm font-normal">Login</Link>
            <Link href="/signup" className="nav-pry-btn text-sm font-normal">Apply</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="sec-bg pry-color float-left w-full">
      <div className="max-w-7xl mx-auto pt-12 pb-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {/* <Image src={logoIcon} alt="NDDC Logo" width={100} height={100} /> */}
            <img src="/images/logo-transparent.png" alt="NDDC Logo" style={{width: '170px'}} />
            <p className="mt-4 text-sm">
              <strong>NDDC VISION:</strong> "To offer a lasting solution to the socio-economic difficulties of the Niger Delta region."
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Eastern Bypass Marine Base,</p>
            <p>Port Harcourt, Rivers State</p>
            <p className="flex-div gap-2 mt-2">
                <img src="/images/email.png" alt="email" className="contact-icon w-[20px]" />
                <a href="mailto:info@nddc.gov.ng">info@nddc.gov.ng</a>
            </p>
            <p className="flex-div gap-2">
                <img src="/images/phone.png" alt="phone" className="contact-icon w-[20px]" />
                <a href="tel:+9200368090">+92 (003) 68-090</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <img src="/images/twitterx.png" alt="x" className="social-icon hover-scale" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <img src="/images/facebook.png" alt="facebook" className="social-icon hover-scale" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <img src="/images/linkedin.png" alt="linkedin" className="social-icon hover-scale" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <img src="/images/instagram.png" alt="instagram" className="social-icon hover-scale" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-[80px] border-t border-teal-800 pt-[20px] text-center">
          <p>&copy; Copyright 2023 Niger Delta Development Commission</p>
        </div>
      </div>
    </footer>
  );
}
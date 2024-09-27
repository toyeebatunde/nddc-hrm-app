import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {/* <Image src={logoIcon} alt="NDDC Logo" width={100} height={100} /> */}
            <img src="/images/logo.jpg" alt="NDDC Logo" style={{width: '100px'}} />
            <p className="mt-4 text-sm">
              <strong>NDDC VISION:</strong> "To offer a lasting solution to the socio-economic difficulties of the Niger Delta region."
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Eastern Bypass Marine Base,</p>
            <p>Port Harcourt, Rivers State</p>
            <p>Email: info@nddc.gov.ng</p>
            <p>Phone: +92 (003) 68-090</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">LinkedIn</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-teal-800 pt-8 text-center">
          <p>&copy; Copyright 2023 Niger Delta Development Commission</p>
        </div>
      </div>
    </footer>
  );
}
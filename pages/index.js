import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Script from "next/script";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const services = [
    { title: "Access Emerging Talent", description: "Benefit from skilled, motivated interns eager to apply their knowledge and contribute to your company's success." },
    { title: "Cost-Effective Labor", description: "The program provides interns with a monthly stipend, removing the financial burden from employers." },
    { title: "Corporate Social Responsibility", description: "Play a key role in youth development and economic growth in the Niger Delta." },
    { title: "Long-term Benefits", description: "Internships often lead to long-term employment opportunities, reducing your recruitment costs." },
    { title: "Sector-Specific Talent", description: "Gain interns trained in key areas relevant to your business sector, with sector leads ensuring alignment between interns' skills and industry needs." },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>NDDC Youth Internship Scheme</title>
        <link rel="icon" href="/NDDC-icon.png" />
      </Head>

      <Navbar />

      <main>
        {/*===--- Hero Section ---===*/}
        <section id="hero" className="bg-[#ffffff] pry-color float-left w-full">
          <div className="h-full relative z-[5]">
            <div className="home-content-wrapper max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
                <h1 className="home-title">Niger Delta (ND) Youth Internship Scheme</h1>
                <p className="text-[24px] mt-[10px] mb-[50px]">Empowering the next generation of skilled professionals in the Niger Delta</p>
                <a href="#about" className="hero-learnmore-btn hover-scale bg-white sec-color font-medium transition duration-300">
                  Learn More
                </a>
              </div>
              <div className="md:w-1/2 text-right" data-aos="fade-left">
                <img src="/images/hero-1.jpg" alt="Youth Internship" className="hero-img rounded-[20px] shadow-xl w-[80%]" />
              </div>
            </div>
          </div>
          <canvas
            id="header_canvas"
            width="1898.000015258789"
            height="536.25"
          ></canvas>
          <Script src="/flourish.js" strategy="lazyOnload" />

          <img src="/images/hero-1.jpg" alt="Youth Internship" className="hero-img-2 rounded-[20px] shadow-xl w-[80%]" />
        </section>
        {/*===--- end of Hero Section ---===*/}

        {/*===--- About Section ---===*/}
        <section id="about" className="py-16 bg-white float-left w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title font-bold" data-aos="fade-up">About the Program</h2>
            <div className="about-content-wrapper grid md:grid-cols-2 gap-8">
              <div className="about-txt-side" data-aos="fade-right">
                <div>
                  <p className="text-lg mb-4">
                    The Niger Delta Youth Internship Scheme is a transformative initiative designed to bridge the gap between education and employment by providing 12-month internships to 10,000 young people across various industries.
                  </p>
                  <p className="text-lg">
                    These sectors align with the region's growth potential, helping to develop a workforce ready for the challenges of tomorrow.
                  </p>
                </div>

                <div className="industries-wrapper mt-6">
                  <h3 className="text-xl font-semibold mb-4">Key Industries:</h3>
                  <ul className="industries-list">
                    <li className="bg-[#4A90E2]">
                      <img src="/images/industries/information-technology.png" alt="information-technology" className="industry-icon" />
                      <span>Information Technology</span>
                    </li>
                    <li className="bg-[#7ED321]">
                      <img src="/images/industries/agriculture.png" alt="agriculture" className="industry-icon" />
                      <span>Agriculture</span>
                    </li>
                    <li className="bg-[#50E3C2]">
                      <img src="/images/industries/renewable-energy.png" alt="renewable-energy" className="industry-icon" />
                      <span>Renewable Energy</span>
                    </li>
                    <li className="bg-[#FF5A5F]">
                      <img src="/images/industries/doctors-bag.png" alt="doctors-bag" className="industry-icon" />
                      <span>Healthcare</span>
                    </li>
                    <li className="bg-[#F5A623]">
                      <img src="/images/industries/training.png" alt="training" className="industry-icon" />
                      <span>Education and Skills Training</span>
                    </li>
                    <li className="bg-[#BD10E0]">
                      <img src="/images/industries/engineering.png" alt="engineering" className="industry-icon" />
                      <span>Manufacturing and Engineering</span>
                    </li>
                    <li className="bg-[#FF9500]">
                      <img src="/images/industries/creativity.png" alt="creativity" className="industry-icon" />
                      <span>Creative Arts and Media</span>
                    </li>
                    <li className="bg-[#D0021B]">
                      <img src="/images/industries/construction.png" alt="construction" className="industry-icon" />
                      <span>Construction</span>
                    </li>
                    <li className="bg-[#4A4A4A]">
                      <img src="/images/industries/public-transportation.png" alt="public-transportation" className="industry-icon" />
                      <span>Logistics and Transportation</span>
                    </li>
                    <li className="bg-[#9013FE]">
                      <img src="/images/industries/idea.png" alt="idea" className="industry-icon" />
                      <span>Entrepreneurship</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="about-img-side" data-aos="fade-left">
                <img src="/images/hero-4.jpg" alt="internship" className="rounded-[20px] shadow-xl w-[90%] float-right" />
              </div>
            </div>
          </div>
        </section>
        {/*===--- end of About Section ---===*/}

        {/*===--- Why-Host-An-Intern Section ---===*/}
        <section id="why-host-an-intern" className="py-16 bg-gray-100 float-left w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title font-bold text-center" data-aos="fade-up">Why Host an Intern?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/*===--- end of Why-Host-An-Intern Section ---===*/}

        {/*===--- How-To-Apply Section ---===*/}
        <section id="how-to-apply" className="py-16 bg-white  float-left w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 float-left">
            <h2 className="section-title font-bold text-center mb-8" data-aos="fade-up">How to Apply</h2>
            <div className="prose prose-lg mx-auto float-left" data-aos="fade-up" data-aos-delay="100">
              <p className="text-center text-[18px] max-w-[900px] mx-auto">
                If your company is ready to help shape the future of the Niger Delta while benefiting from fresh 
                talent, we encourage you to apply to host interns. The application process is simple, and 
                our team is here to support you every step of the way.
              </p>
              <ol className="float-left my-[50px]">
                <li data-aos="fade-left" data-aos-delay="100">
                  <div>
                    <span className="hta-num">1</span>
                    <span className="hta-txt">
                      Review the program details and ensure your company meets the eligibility criteria.
                    </span>
                  </div>
                </li>
                <li data-aos="fade-right" data-aos-delay="100">
                  <div>
                    <span>
                      Fill out the online application form, providing details about your company and the 
                      internship opportunities you can offer.
                    </span>
                    <span className="hta-num">2</span>
                  </div>
                </li>
                <li data-aos="fade-left" data-aos-delay="100">
                  <div>
                    <span className="hta-num">3</span>
                    <span>
                      Our team will review your application and may contact you for additional information if needed.
                    </span>
                  </div>
                </li>
                <li data-aos="fade-right" data-aos-delay="100">
                  <div>
                    <span>
                      If approved, you'll receive an acceptance notification and further instructions on how to proceed.
                    </span>
                    <span className="hta-num">4</span>
                  </div>
                </li>
                <li data-aos="fade-left" data-aos-delay="100">
                  <div>
                    <span className="hta-num">5</span>
                    <span>
                      Prepare to welcome your intern(s) and provide them with a rewarding learning experience!
                    </span>
                  </div>
                </li>
              </ol>

              <p className="text-center text-[18px] float-left w-full">
                Start your journey with us today and help empower the next generation!
              </p>
            </div>
          </div>
        </section>
      {/*===--- end of How-To-Apply Section ---===*/}

      {/*===--- Contact-Us Section ---===*/}
      <section id="contact-us" className="py-16 bg-gray-100 float-left w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <div className="contact-us-block pry-bg text-white text-center">
              <h2 className="section-title text-center font-bold text-white">Get in Touch</h2>
              <p className="mb-4 text-[18px]">For more information or any questions about the application process, please reach out to our Employer Relations team:</p>
              <ul className="space-y-2 my-[30px]">
                <li className="flex-div gap-2 justify-center">
                  <img src="/images/email-white.png" alt="email" className="w-[20px]" />
                  <a href="mailto:employer.relations@nddc.gov.ng">employer.relations@nddc.gov.ng</a>
                </li>
                <li className="flex-div gap-2 justify-center">
                  <img src="/images/phone-white.png" alt="phone" className="w-[20px]" />
                  <a href="tel:+2348001234567">+234 (0) 800 123 4567</a>
                </li>
                <li className="flex-div gap-2 justify-center">
                  <img src="/images/address-white.png" alt="address" className="w-[20px]" />
                  <a>NDDC Headquarters, Eastern Bypass, Port Harcourt, Rivers State</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/*===--- end of Contact-Us Section ---===*/}
      </main>

      <Footer />
    </div>
  );
}
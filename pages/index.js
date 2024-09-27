import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        <section id="hero-section">
          <div className="bg-[#2DCD7C] pry-color h-full">
            <div className="home-content-wrapper max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
                <h1 className="home-title">Niger Delta (ND) Youth Internship Scheme</h1>
                <p className="text-[24px] mt-[30px] mb-[50px]">Empowering the next generation of skilled professionals in the Niger Delta</p>
                <a href="#about" className="hero-learnmore-btn bg-white text-teal-800 font-medium transition duration-300">
                  Learn More
                </a>
              </div>
              <div className="md:w-1/2 text-right" data-aos="fade-left">
                <img src="/images/hero-1.jpg" alt="Youth Internship" className="rounded-[20px] shadow-xl w-[80%] float-right" />
              </div>
            </div>
          </div>
        </section>
        {/*===--- end of Hero Section ---===*/}

        {/*===--- About Section ---===*/}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-3xl font-bold text-center mb-8" data-aos="fade-up">About the Program</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div data-aos="fade-right">
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
                    <li>
                      <img src="/images/industries/information-technology.png" alt="information-technology" className="industry-icon" />
                      <span>Information Technology</span>
                    </li>
                    <li>
                      <img src="/images/industries/agriculture.png" alt="agriculture" className="industry-icon" />
                      <span>Agriculture</span>
                    </li>
                    <li>
                      <img src="/images/industries/renewable-energy.png" alt="renewable-energy" className="industry-icon" />
                      <span>Renewable Energy</span>
                    </li>
                    <li>
                      <img src="/images/industries/doctors-bag.png" alt="doctors-bag" className="industry-icon" />
                      <span>Healthcare</span>
                    </li>
                    <li>
                      <img src="/images/industries/training.png" alt="training" className="industry-icon" />
                      <span>Education and Skills Training</span>
                    </li>
                    <li>
                      <img src="/images/industries/engineering.png" alt="engineering" className="industry-icon" />
                      <span>Manufacturing and Engineering</span>
                    </li>
                    <li>
                      <img src="/images/industries/creativity.png" alt="creativity" className="industry-icon" />
                      <span>Creative Arts and Media</span>
                    </li>
                    <li>
                      <img src="/images/industries/construction.png" alt="construction" className="industry-icon" />
                      <span>Construction</span>
                    </li>
                    <li>
                      <img src="/images/industries/public-transportation.png" alt="public-transportation" className="industry-icon" />
                      <span>Logistics and Transportation</span>
                    </li>
                    <li>
                      <img src="/images/industries/idea.png" alt="idea" className="industry-icon" />
                      <span>Entrepreneurship</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div data-aos="fade-left">
                <img src="/images/hero-4.jpg" alt="internship" className="rounded-[20px] shadow-xl w-[90%] float-right" />
              </div>
            </div>
          </div>
        </section>
        {/*===--- end of About Section ---===*/}

        {/*===--- Why-Host-An-Intern Section ---===*/}
        <section id="why-host-an-intern" className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">Why Host an Intern?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/*===--- end of Why-Host-An-Intern Section ---===*/}
      </main>

      <Footer />
    </div>
  );
}
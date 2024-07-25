// src/components/HomePage.jsx
import { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import banner from "../assets/imgs/69.jpg";
import "../index.css";

import company1 from "../assets/imgs/company/company1.png";
import company2 from "../assets/imgs/company/company2.png";
import company3 from "../assets/imgs/company/company3.png";
import company4 from "../assets/imgs/company/company4.png";
import company5 from "../assets/imgs/company/company5.png";
import company6 from "../assets/imgs/company/company6.png";
import company7 from "../assets/imgs/company/company7.png";
import journey from "../assets/imgs/journey.png";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  body {
    background-color: #F5F6F7;
    color: #333;
  }
`;

function HomePage() {
  const services = [
    {
      id: 1,
      title: "Job Postings",
      decription: "Easy access to various job postings from various employers.",
      icon: faBriefcase,
    },
    {
      id: 2,
      title: "Referral System",
      decription: "Get referrals and increase your chances of getting hired.",
      icon: faUserFriends,
    },
    {
      id: 3,
      title: "Real-time Chat",
      decription:
        "Get in touch with hiring comapnies, referees in reat-time and increase your chances of getting hired",
      icon: faCalendarAlt,
    },
  ];
  return (
    <>
      <GlobalStyle />

      <section className="h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-14 bg-white mx-auto">
        <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left md:pl-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Job Match: Tailored Opportunities to Fit Your
            Skills
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            KonnecThru is dedicated to helping you find the right job, ask for
            referrals, and explore various job listings. Our platform is
            designed to connect you with the best opportunities tailored to your
            skills and preferences.
          </p>
          <button className="px-6 py-3 bg-firstColor text-white hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0 md:pr-8">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-auto object-cover text-left mx-auto"
          />
        </div>
      </section>

      <section>
        <div
          className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto"
          id="service"
        >
          <div className="text-center my-8">
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">
              Our Partners
            </h2>
            <p className="text-neutralGrey op-text">
              We are proud to collaborate with top-tier companies to bring you
              the best job opportunities. Our partners include leading
              organizations from various industries, ensuring a wide range of
              career prospects for our users.
            </p>
            <div className="my-12 flex flex-wrap justify-between items-center gap-8 ">
              <img src={company1} alt="" />
              <img src={company2} alt="" />
              <img src={company3} alt="" />
              <img src={company4} alt="" />
              <img src={company5} alt="" />
              <img src={company6} alt="" />
              <img src={company7} alt="" />
            </div>
          </div>

          {/* service cards */}
          <div className="mt-20 text-center md:w-1/2 mx-auto">
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-3">
              Manage your entire community in a single system
            </h2>
            <p className="text-neutralGrey">
              We have been working with some Fortune 500+ clients
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-indigo-700 transition-all duration-300 flex items-center justify-center h-full"
              >
                <div className="">
                  <div className="bg-[#d4d9ed] w-14 h-14 mx-auto mb-4 rounded-tl-3xl rounded-br-3xl">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="featureIcon"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-neutralGrey">
                    {service.decription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto my-10 bg-white">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="top-image-content">
            <img src={journey} alt="" className="image-journey" />
          </div>
          <div className="md:w-3/5 mx-auto top-text-content">
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5">
              The Journey of Three Years at KonnecThru
            </h2>
            <p className="md:w-3/4 text-neutralGrey mb-8 cl-text">
              Working at KonnecThru has been a transformative experience. We
              have dedicated ourselves to connecting job seekers with their
              dream careers and fostering valuable professional relationships.
              Our commitment to excellence and innovation has driven us to
              continuously improve our platform, ensuring it meets the needs of
              our users. We take pride in the community we have built and the
              success stories we have helped create.
            </p>
            <button className="btn bg-firstColor">Learn More</button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-2 md:w-2/3">
              Revolutionizing the <br />{" "}
              <span className="text-brandPrimary">Job Search Experience</span>
            </h2>
            <p>
              With dedication and innovation, we have transformed how job
              seekers find opportunities and connect with employers.
            </p>
          </div>

          {/* stats */}
          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    500,000+
                  </h4>
                  <p>Active Job Seekers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    12,000+
                  </h4>
                  <p>Partner Companies</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    1,200,000+
                  </h4>
                  <p>Job Listings</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    350,000+
                  </h4>
                  <p>Referrals Made</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footerContainer">
          <p>&copy; 2024 KonnecThru. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

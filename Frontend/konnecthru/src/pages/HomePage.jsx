// src/components/HomePage.jsx
import { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendarAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import banner from '../assets/imgs/46.png';
import reviewImage from '../assets/imgs/review.jpg';
import '../index.css';  // Import the CSS file

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
  return (
    <>
      <GlobalStyle />

      <section className="hero">
        <div className="heroTextContainer">
          <h2 className="heroTitle">Welcome to KonnecThru</h2>
          <p className="heroText">Your one-stop solution for all part-time job-related needs for students.</p>
          <a href="/login" className="btn">Get Started</a>
        </div>
        <img src={banner} alt="KonnecThru" className="heroImage" />
      </section>

      <section className="features">
        <div className="featureContainer">
          <div className="feature">
            <FontAwesomeIcon icon={faBriefcase} className="featureIcon" />
            <h3 className="featureTitle">Job Postings</h3>
            <p>Easy access to job postings from various employers.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faCalendarAlt} className="featureIcon" />
            <h3 className="featureTitle">Hiring Events</h3>
            <p>Stay updated on upcoming hiring events.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faUserFriends} className="featureIcon" />
            <h3 className="featureTitle">Referral System</h3>
            <p>Get referrals and increase your chances of getting hired.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonialsContainer">
          <div className="testimonial">
            <img src={reviewImage} alt="User" className="testimonialImage" />
            <p>KonnecThru made my job search so much easier and quicker</p>
            <h4 className="testimonialAuthor">- Sunny</h4>
          </div>
          <div className="testimonial">
            <img src={reviewImage} alt="User" className="testimonialImage" />
            <p>The referral system is a game-changer. I got hired within a week</p>
            <h4 className="testimonialAuthor">- Sai</h4>
          </div>
          <div className="testimonial">
            <img src={reviewImage} alt="User" className="testimonialImage" />
            <p>The referral system is a game-changer. I got hired within a week</p>
            <h4 className="testimonialAuthor">- Vishal</h4>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerContainer">
          <p>&copy; 2024 KonnecThru. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

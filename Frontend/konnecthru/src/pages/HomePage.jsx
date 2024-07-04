/* eslint-disable no-dupe-keys */
import { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import banner from "../assets/imgs/46.png";
import reviewImage from "../assets/imgs/review.jpg";

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

const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#333",
    padding: "100px 20px",
    backgroundColor: "#fff",
  },
  heroTextContainer: {
    flex: "1",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginRight: "20px",
    borderRadius: "5px",
    fontSize: "20px",
  },
  heroImage: {
    flex: "1",
    maxWidth: "35%",
    height: "auto",
    maxHeight: "500px",
    borderRadius: "5px",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  heroText: {
    fontSize: "24px",
    marginBottom: "20px",
    width: "50%",
  },
  btn: {
    backgroundColor: "#3D52A0",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
  },
  features: {
    backgroundColor: "#ADBBDA",
    padding: "50px 20px",
  },
  featureContainer: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  feature: {
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "50px",
    color: "#3D52A0",
    marginBottom: "20px",
  },
  featureTitle: {
    marginBottom: "10px",
  },
  testimonials: {
    backgroundColor: "#F5F6F7",
    padding: "50px 20px",
    textAlign: "center",
  },
  testimonialsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  testimonialTitle: {
    marginBottom: "30px",
  },
  testimonial: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    flex: "0 1 calc(33.333% - 40px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  testimonialImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  testimonialAuthor: {
    marginTop: "10px",
  },
  footer: {
    backgroundColor: "#3D52A0",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
  },
  footerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  feature: {
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "50px",
    color: "#3D52A0",
    marginBottom: "20px",
  },
  featureTitle: {
    marginBottom: "10px",
  },
  testimonials: {
    backgroundColor: "#F5F6F7",
    padding: "50px 20px",
    textAlign: "center",
  },
  testimonialsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  testimonialTitle: {
    marginBottom: "30px",
  },
  testimonial: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    flex: "0 1 calc(33.333% - 40px)", // Allow three testimonials per row
    display: "flex", // Flex layout for content inside
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  testimonialImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },

  testimonialAuthor: {
    marginTop: "10px",
  },
  footer: {
    backgroundColor: "#3D52A0",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
  },
  footerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  loginSection: {
    backgroundColor: "#F5F6F7",
    padding: "50px 20px",
    textAlign: "center",
  },
  loginContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  loginTitle: {
    marginBottom: "20px",
  },
  loginInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loginButton: {
    backgroundColor: "#3D52A0",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

function HomePage() {
  return (
    <>
      <GlobalStyle />

      <section style={styles.hero}>
        <div style={styles.heroTextContainer}>
          <h2 style={styles.heroTitle}>Welcome to KonnecThru</h2>
          <p style={styles.heroText}>
            Your one-stop solution for all part-time job-related needs for
            students.
          </p>
          <a href="#" style={styles.btn}>
            Get Started
          </a>
        </div>
        <img src={banner} alt="KonnecThru" style={styles.heroImage} />
      </section>

      <section style={styles.features}>
        <div style={styles.featureContainer}>
          <div style={styles.feature}>
            <FontAwesomeIcon icon={faBriefcase} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Job Postings</h3>
            <p>Easy access to job postings from various employers.</p>
          </div>
          <div style={styles.feature}>
            <FontAwesomeIcon icon={faCalendarAlt} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Hiring Events</h3>
            <p>Stay updated on upcoming hiring events.</p>
          </div>
          <div style={styles.feature}>
            <FontAwesomeIcon icon={faUserFriends} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Referral System</h3>
            <p>Get referrals and increase your chances of getting hired.</p>
          </div>
        </div>
      </section>

      <section style={styles.testimonials}>
        <div style={styles.testimonialsContainer}>
          <div style={styles.testimonial}>
            <img src={reviewImage} alt="User" style={styles.testimonialImage} />
            <p>KonnecThru made my job search so much easier and quicker!</p>
            <h4 style={styles.testimonialAuthor}>- Sunny</h4>
          </div>
          <div style={styles.testimonial}>
            <img src={reviewImage} alt="User" style={styles.testimonialImage} />
            <p>
              The referral system is a game-changer. I got hired within a week.
            </p>
            <h4 style={styles.testimonialAuthor}>- Sai</h4>
          </div>
          <div style={styles.testimonial}>
            <img src={reviewImage} alt="User" style={styles.testimonialImage} />
            <p>
              The referral system is a game-changer. I got hired within a week.
            </p>
            <h4 style={styles.testimonialAuthor}>- Vishal</h4>
          </div>
        </div>
      </section>
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p>&copy; 2024 KonnecThru. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

import React from "react";
import photo4 from '../components/photo/photo4.png';

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading} className="animate_animated animate_backInDown">About Us</h1>
      <img src={photo4} alt="About Us" style={{ display: "block", margin: "0 auto 20px", maxWidth: "100px", borderRadius: "8px" }} />
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        Hello, wishes from Craft Bazaaar's to you wonderful people.
      </p>
      <br />
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        Welcome to "CRAFT BAZAAAR", where art comes to life! We are a dynamic online marketplace 
        dedicated to connecting passionate artists and art enthusiasts from around the world.
      </p>  
                  
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        At "CRAFT BAZAAAR", we believe in the power of art to transform spaces and evoke emotions. 
        Whether you're searching for a striking painting, a handcrafted sculpture, or art-inspired decor, 
        you'll find an ever-evolving collection of high-quality, original works from talented creators.
      </p>
          
      <br />
      <h2 style={styles.subHeading} className="animate_animated animate_backInDown">Vision</h2>
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        Our vision is to be the leading global marketplace for physical art and related articles, 
        celebrating creativity and craftsmanship in every form.
      </p>
      <br />
      <h3 style={styles.subHeading} className="animate_animated animate_backInDown">Mission</h3>
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        Our mission is to provide an exceptional online space that empowers artists and vendors to reach a 
        wider audience while offering art enthusiasts an unparalleled selection of distinctive and high-quality artworks.
      </p>
      <ul style={styles.list} className="animate_animated animate_backInDown">
        <li>Curating Excellence: We carefully select and feature artworks that showcase exceptional talent and craftsmanship.</li>
        <li>Supporting Artists: We offer artists and vendors a platform to thrive, ensuring they have the tools and visibility needed to succeed.</li>
        <li>Enhancing Experiences: We strive to create a seamless, enjoyable shopping experience, making the process of discovering and acquiring art straightforward and satisfying.</li>
        <li>Promoting Creativity: We are dedicated to celebrating the diversity of artistic expression and fostering a community where creativity is nurtured and celebrated.</li> 
      </ul>
      <p style={styles.paragraph} className="animate_animated animate_backInDown">
        Thank you for visiting "CRAFT BAZAAAR". We invite you to explore, connect, and find the perfect piece of art that speaks to you.
      </p>

      
      <br />
      {/* Video iframes go here */}

      <footer style={styles.footer}>
        <p>© 2026 CRAFT BAZAAAR | All Rights Reserved</p>
        <nav>
          <a href="/" style={styles.link}>Home</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </nav>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Roboto', sans-serif",
    lineHeight: "1.6",
    backgroundColor:  'LavenderBlush',
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  subHeading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  paragraph: {
    color: "#555",
    marginBottom: "15px",
    fontSize: "1rem",
  },
  list: {
    listStyleType: "disc",
    marginLeft: "20px",
    marginBottom: "20px",
    color: "#444",
  },
  footer: {
    marginTop: "40px",
    padding: "10px 0",
    borderTop: "1px solid #ddd",
    textAlign: "center",
  },
  link: {
    margin: "0 10px",
    color: "#333",
    textDecoration: "none",
  },
};

export default About;

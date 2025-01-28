
import styles from './AboutUs.module.css';

const AboutUs = () => (
  <div className={styles.aboutContainer}>
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome to CrisisBridge</h1>
      {/* <p className={styles.subtitle}>Redefining Waste, Redesigning Futures</p> */}
    </header>

    {/* Glassmorphism Content Section */}
    <div className={styles.glassCard}>
      {/* About Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.text}>
        CrisisBridge is a real-time app designed to bridge the gap between affected individuals and available resources. The platform employs geo-location tagging to connect people in crisis zones with nearby volunteers, shelters, and essential supplies. 
        By partnering with NGOs and other organizations, CrisisBridge facilitates streamlined resource distribution and coordinated community support
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>What Makes Us Stand Out?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>🌍 Sustainability Focus</h3>
            {/* <p className={styles.text}>
              Our solutions are built with a deep commitment to reducing carbon footprints, limiting waste, and promoting eco-friendly practices.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>🤝 Meaningful Partnerships</h3>
            <p className={styles.text}>
              We collaborate with businesses, NGOs, and governments to achieve holistic Sustainable Development Goals (SDGs).
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>💡 Cutting-Edge Technology</h3>
            <p className={styles.text}>
              Leveraging functionalities like chatrooms and order tracking to deliver innovative sustainable solutions.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>📈 Data-Driven Insights</h3>
            <p className={styles.text}>
              Our platform provides actionable insights for informed decision-making.
            </p> */}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className={styles.visionSection}>
        <h2 className={styles.sectionTitle}>Our Vision</h2>
        <p className={styles.text}>
          At SustainaLink, we envision a world where businesses thrive while prioritizing people and the planet. 
          We believe that technology can transform industries and create a more sustainable future.
        </p>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>Join Us in Making a Difference</h2>
        <p className={styles.text}>
          Be part of the SustainaLink community and contribute to building a sustainable future. Together, we can create a lasting impact.
        </p>
        <button className={styles.ctaButton}>Learn More</button>
      </section>
    </div>
  </div>
);

export default AboutUs;


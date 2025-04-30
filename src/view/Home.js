import React, { useEffect } from 'react';
import styles from './Home.module.css';
import banner from '../assets/banner1.png';
import animal1 from '../assets/animal1.png';
import animal2 from '../assets/animal2.png';
import animal3 from '../assets/animal3.png';
import animal4 from '../assets/animal4.png';
import policyImg from '../assets/before-after.png';
import emailIcon from '../assets/email-template.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll(`.${styles.section}`);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
        <div className={styles.heroOverlay}>
          <h1>Forest loss is killing our wildlife – and we’re letting it happen</h1>
          <p>
            Learn about forest loss, meet the species at risk,
            and discover how your voice can make a difference.
          </p>
          <div className={styles.downArrow} onClick={() => scrollTo('section1')}>⏷</div>
        </div>
      </div>

      <section className={`${styles.section} ${styles.greenSection}`} id="section1">
        <div className={styles.sectionContent}>
          <div className={styles.sectionText}>
            <h2>What’s Happening to Our Forests?</h2>
            <p><strong>14%</strong> of Victoria’s native forest cover has been lost since 2000</p>
            <p>Over <strong>500 species</strong> in Victoria are listed as threatened or endangered.</p>
            <p><strong>2%</strong> of land holds over <strong>75%</strong> of biodiversity in some regions.</p>
            <button onClick={() => navigate('/explore-species')}>Discover more</button>
          </div>
          <div className={styles.sectionImagesGrid}>
            <img src={animal1} alt="Species 1" />
            <img src={animal2} alt="Species 2" />
            <img src={animal3} alt="Species 3" />
            <img src={animal4} alt="Species 4" />
          </div>
        </div>
        <div className={styles.downArrow} onClick={() => scrollTo('section2')}>⏷</div>
      </section>

      <section className={`${styles.section} ${styles.whiteBackground}`} id="section2">
        <div className={styles.sectionContent}>
          <img src={policyImg} alt="Policy visual" className={styles.sectionImgLeft} />
          <div className={styles.sectionText}>
            <h2>Policies protect nature</h2>
            <p>
              <strong>The Flora and Fauna Guarantee Act 1988</strong> has helped protect over <strong>700 threatened species</strong>, and led to successful recovery programs. One of its major wins?
              The <em>Eastern Barred Bandicoot</em>, once considered extinct in the wild, has now been reintroduced thanks to coordinated government action and strong legal protection. <em>Bandicoot story – ABC News.</em>
            </p>
            <button onClick={() => navigate('/take-action')}>Explore policies</button>
          </div>
        </div>
        <div className={styles.downArrow} onClick={() => scrollTo('section3')}>⏷</div>
      </section>

      <section className={`${styles.section} ${styles.greenSection}`} id="section3">
        <div className={styles.sectionContent}>
          <div className={styles.sectionText}>
            <h2>Speak Up with Confidence</h2>
            <p>
              Use our ready-to-go email tool to raise your voice.
              Pick a topic, add your message, and send it to someone who can make a difference.
            </p>
            <button onClick={() => navigate('/email')}>Write email</button>
          </div>
          <img src={emailIcon} alt="Email icon" className={styles.sectionImgRight} />
        </div>
      </section>
      <footer style={{
        backgroundColor: '#1d4022',
        color: 'white',
        padding: '40px 40px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '40px',
          fontWeight: 'bold'
        }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a>
        </div>
        <div>
          © 2025 Protecting Life on Land | Based in Australia | Designed for SDG 15 Impact
        </div>
      </footer>
    </main>
  );
};

export default Home;

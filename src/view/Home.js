import React, { useEffect } from 'react';
import styles from './Home.module.css';
import animal1 from '../assets/animal1.png';
import animal2 from '../assets/animal2.png';
import animal3 from '../assets/animal3.png';
import animal4 from '../assets/animal4.png';
import policyImg from '../assets/before-after.png';
import emailIcon from '../assets/email-template.jpg';
import { useNavigate } from 'react-router-dom';
import HeaderOverlay from '../components/HeaderOverlay';

const Home = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <div className={styles.hero}>
        <HeaderOverlay />
        <video
          className={styles.videoBackground}
          src={require('../assets/forest-video.mp4')}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className={styles.heroOverlay}>
          <h1>Forest loss is killing our wildlife and we’re letting it happen</h1>
          <p>
            See the damage, know what's at stake, and help shape the political will to protect our forests.
          </p>
          <div className={styles.downArrow} onClick={() => scrollTo('section1')}>⏷</div>
        </div>
      </div>

      <section className={`${styles.section} ${styles.greenSection}`} id="section1">
        <div className={styles.sectionContent}>
          <div className={styles.sectionText}>
            <h2 className={styles.sectionNumber}>01</h2>
            <h2>What’s Happening to Our Forests?</h2>
            <p><strong>14%</strong> of Victoria’s native forest cover has been lost since 2000</p>
            <p>Over <strong>500 species</strong> in Victoria are listed as threatened or endangered.</p>
            <p><strong>2%</strong> of land holds over <strong>75%</strong> of biodiversity in some regions.</p>
            <button onClick={() => navigate('/forest-habitat')}>Discover policies</button>
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
            <h2 className={styles.sectionNumber}>02</h2>
            <h2>Policies protect nature</h2>
            <p>
              <strong>The Flora and Fauna Guarantee Act 1988</strong> has helped protect over <strong>700 threatened species</strong>, and led to successful recovery programs. One of its major wins?
              The <em>Eastern Barred Bandicoot</em>, once considered extinct in the wild, has now been reintroduced thanks to coordinated government action and strong legal protection. <em>Bandicoot story – ABC News.</em>
            </p>
            <button onClick={() => navigate('/policy')}>Explore policies</button>
          </div>
        </div>
        <div className={styles.downArrow} onClick={() => scrollTo('section3')}>⏷</div>
      </section>

      <section className={`${styles.section} ${styles.greenSection}`} id="section3">
        <div className={styles.sectionContent}>
          <div className={styles.sectionText}>
            <h2 className={styles.sectionNumber}>03</h2>
            <h2>Speak Up with Confidence</h2>
            <p>
              Use our ready-to-go email tool to raise your voice.
              Pick a topic, add your message, and send it to someone who can make a difference.
            </p>
            <button onClick={() => navigate('/email')}>Write email</button>
          </div>
          <img src={emailIcon} alt="Email icon" className={styles.sectionImgRight} />
        </div>
        <div className={styles.downArrow} onClick={() => scrollTo('section4')}>⏷</div>
      </section>

      <section className={styles.successBanner} id="section4">
      <div className={styles.successOverlay}>
          <h2 className={styles.bannerTitle}>Success stories</h2>
          <p className={styles.bannerText}>
            These real victories prove that your voice and actions matter — together, we can protect our forests.
          </p>
          <div className={styles.bannerButtons}>
            <button onClick={() => navigate('/your-way')}>Discover more</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

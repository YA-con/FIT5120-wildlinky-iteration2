import React, { useState, useCallback, useEffect } from "react";
import styles from "./ExploreSpecies.module.css";
import { useInView } from 'react-intersection-observer';
import chart1 from "../assets/chart1.png";
import chart2 from "../assets/chart2.png";
import chart3 from "../assets/chart3.png";
import chart4 from "../assets/chart4.png";
import chart5 from "../assets/chart5.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ForestLossChart from "./ForestLossChart";
import loggingImg from '../assets/Logging.jpg';
import landClearingImg from '../assets/Land-clearing.jpg';
import bushfiresImg from '../assets/Bushfires.jpg';
import invasiveImg from '../assets/Invasive-Species.png';
import fragmentationImg from '../assets/Fragmentation.png';
import climateImg from '../assets/Climate-Change.png';
import { useNavigate } from 'react-router-dom';

const ExploreSpecies = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const navigate = useNavigate();

  const forestImages = [chart1, chart2, chart3, chart4, chart5];
  const forestLabels = [
    "Wet Eucalypt Forests",
    "Dry Forests & Box-Ironbark Woodlands",
    "Rainforests",
    "Alpine & Subalpine Forests",
    "Riparian Forests"
  ];

  const forestDescriptions = [
    (
      <ul>
        <li><strong>Towering Mountain Ash forests</strong> in the Central Highlands and Otways.</li>
        <li><strong>Key species:</strong> Leadbeater’s Possum, Greater Glider, Powerful Owl</li>
        <li><strong>Main threats:</strong> Logging, bushfires</li>
        <li><strong>Fun fact:</strong> These forests store more carbon per hectare than the Amazon.</li>
      </ul>
    ),
    (
      <ul>
        <li><strong>Open, drought-adapted forests</strong> across north-central Victoria.</li>
        <li><strong>Key species:</strong> Swift Parrot, Brush-tailed Phascogale, Hooded Robin</li>
        <li><strong>Main threats:</strong> Land clearing, fragmentation</li>
        <li><strong>Fun fact:</strong> Only 15% of the original woodland remains.</li>
      </ul>
    ),
    (
      <ul>
        <li><strong>Ancient, moist forests</strong> in cool mountain gullies.</li>
        <li><strong>Key species:</strong> Velvet Worm, Rose-crowned Fruit-Dove, Diamond Python</li>
        <li><strong>Main threats:</strong> Climate shifts, invasive species</li>
        <li><strong>Fun fact:</strong> These forests are over <strong>60 million years old</strong> — living fossils.</li>
      </ul>
    ),
    (
      <ul>
        <li><strong>Ancient, moist forests</strong> in cool mountain gullies.</li>
        <li><strong>Key species:</strong> Velvet Worm, Rose-crowned Fruit-Dove, Diamond Python</li>
        <li><strong>Main threats:</strong> Climate shifts, invasive species</li>
        <li><strong>Fun fact:</strong> These forests are over <strong>60 million years old</strong> — living fossils.</li>
      </ul>
    ),
    (
      <ul>
        <li><strong>Forests along rivers, creeks, and floodplains</strong>, rich in biodiversity.</li>
        <li><strong>Key species:</strong> River Red Gum, Platypus, Azure Kingfisher</li>
        <li><strong>Main threats:</strong> Water regulation, pollution, invasive weeds</li>
        <li><strong>Fun fact:</strong> Riparian zones are critical for water quality and erosion control.</li>
      </ul>
    )
  ];

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(forestImages.length - 3, prev + 1));
  };

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const threats = [
    { title: 'Logging', desc: "20% of logged forests haven't regrown — even after 20 years.", image: loggingImg },
    { title: 'Land clearing', desc: 'Farms, roads, and cities are wiping out critical forest habitat.', image: landClearingImg },
    { title: 'Bushfires', desc: '1.2 million hectares of Victorian forests burnt in just one fire season.', image: bushfiresImg },
    { title: 'Invasive Species', desc: "27% of Australia's threatened species suffer from invasive pests.", image: invasiveImg },
    { title: 'Fragmentation', desc: 'Roads and clearing split forests into isolated, fragile patches.', image: fragmentationImg },
    { title: 'Climate Change', desc: 'Hotter, drier weather is pushing forests beyond survival limits.', image: climateImg }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.bannerOverlay}>
            <h1>
              Discover Victoria’s Wildlife <br />
              Through the Forests They Call Home.
            </h1>
            <p>
              Explore species native to Victoria’s forests, understand their threats, and find out how you can help protect their habitats.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.introBlock}>
        <h2 className={styles.title}>
          Victoria is losing its forests faster than ever — what does that mean for life within them?
        </h2>
        <ForestLossChart />
        <div ref={ref} className={`${styles.numbersBox} ${inView ? styles.fadeIn : ''}`}>
          <h3>What the Numbers Say</h3>
          <p>
            Forest cover in Victoria has declined dramatically—about
            <span className={styles.highlight}> 25% </span> of it has vanished between 2001 and 2020.
            Especially, the massive spike in tree cover loss during
            <span className={styles.highlight}> 2019–2020 </span> was driven by catastrophic bushfires across Victoria.
            Following this extreme event, damage to habitats remains severe, threatening the survival of many native species.
          </p>
        </div>
      </div>

      <div className={styles.forestThreats}>
        <h2>What’s Breaking Our Forests</h2>
        <div className={styles.threatGrid}>
          {threats.map((t, i) => (
            <div key={i} className={styles.threatCard}>
              <div className={styles.threatImage} style={{ backgroundImage: `url(${t.image})` }}>
                <div className={styles.titleBar}><h3>{t.title}</h3></div>
              </div>
              <p className={styles.threatText}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Forest Ecology in Victoria</div>
        <div className={styles.carouselWrapper}>
          <button className={styles.arrowLeft} onClick={handlePrev}><ChevronLeft size={32} /></button>
          <div className={styles.carouselViewport}>
            <div className={styles.carouselInner} style={{ transform: `translateX(-${startIndex * 33.33}%)` }}>
              {forestImages.map((img, index) => (
                <div className={styles.carouselItem} key={index} onClick={() => setModalIndex(index)}>
                  <img src={img} alt={`Forest ${index + 1}`} />
                  <div className={styles.overlay}><span>{forestLabels[index]}</span></div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.arrowRight} onClick={handleNext}><ChevronRight size={32} /></button>
        </div>
        <div className={styles.carouselButtons}>
          <button onClick={() => navigate('/species-location')}>Explore species locations</button>
          <button onClick={() => navigate('/take-action')}>Policy & Protection</button>
        </div>
      </div>

      {modalIndex !== null && (
        <div className={styles.modalOverlay} onClick={() => setModalIndex(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <h3>{forestLabels[modalIndex]}</h3>
            <p>{forestDescriptions[modalIndex]}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ExploreSpecies;

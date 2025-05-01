import React, { useState, useCallback, useEffect } from "react";
import styles from "./ExploreSpecies.module.css";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MapBox from "../components/MapBox";
import { useInView } from 'react-intersection-observer';
import { useSpeciesData } from "../hook/useSpeciesData";
import chart1 from "../assets/chart1.png";
import chart2 from "../assets/chart2.png";
import chart3 from "../assets/chart3.png";
import chart4 from "../assets/chart4.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ForestLossChart from "./ForestLossChart";
import ChatWidget from "./ChatWidget";
import bgKoala from '../assets/koala.png';
import loggingImg from '../assets/Logging.jpg';
import landClearingImg from '../assets/Land-clearing.jpg';
import bushfiresImg from '../assets/Bushfires.jpg';
import invasiveImg from '../assets/Invasive-Species.png';
import fragmentationImg from '../assets/Fragmentation.png';
import climateImg from '../assets/Climate-Change.png';

const charts = [chart1, chart2, chart3, chart4];

const ExploreSpecies = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [query, setQuery] = useState({ postcode: "", species_id: 0 });

  const {
    info,
    points,
    charts: chartData,
    loadingInfo,
    error,
  } = useSpeciesData(query);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(charts.length - 3, prev + 1));
  };

  const handlePostcodeChange = useCallback((e) => {
    const postcode = e.target.value;
    setQuery((prev) => ({ ...prev, postcode }));
  }, []);

  const handleSpeciesChange = useCallback((species_id) => {
    setQuery((prev) => ({ ...prev, species_id }));
  }, []);

  const forestImages = [chart1, chart2, chart3, chart4];
  const forestLabels = [
    "Wet Eucalypt Forests",
    "Dry Forests & Box-Ironbark Woodlands",
    "Rainforests",
    "Alpine & Subalpine Forests",
  ];

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const threats = [
    {
      title: 'Logging',
      desc: "20% of logged forests haven't regrown — even after 20 years.",
      image: loggingImg
    },
    {
      title: 'Land clearing',
      desc: 'Farms, roads, and cities are wiping out critical forest habitat.',
      image: landClearingImg
    },
    {
      title: 'Bushfires',
      desc: '1.2 million hectares of Victorian forests burnt in just one fire season.',
      image: bushfiresImg
    },
    {
      title: 'Invasive Species',
      desc: "27% of Australia's threatened species suffer from invasive pests.",
      image: invasiveImg
    },
    {
      title: 'Fragmentation',
      desc: 'Roads and clearing split forests into isolated, fragile patches.',
      image: fragmentationImg
    },
    {
      title: 'Climate Change',
      desc: 'Hotter, drier weather is pushing forests beyond survival limits.',
      image: climateImg
    }
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
              Explore species native to Victoria’s forests, understand their
              threats, and find out how you can help protect their habitats.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.introBlock}>
        <h2 className={styles.title}>
          Victoria is losing its forests faster than ever — what does that mean
          for life within them?
        </h2>
        <ForestLossChart />
        <div ref={ref}className={`${styles.numbersBox} ${inView ? styles.fadeIn : ''}`}>
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

      <div className={styles.speciesStats}style={{backgroundImage: `url(${bgKoala})`,}}>
        <div className={styles.flexWrapper}>
          <div className={`${styles.statColumn} ${styles.slideInLeft}`}>
            <div className={`${styles.statBox} ${styles.extinct}`}>
              <strong>10</strong>
              <span>species are already extinct.</span>
            </div>
            <div className={`${styles.statBox} ${styles.critical}`}>
              <strong>24</strong>
              <span>critically endangered —<br />hanging by a thread.</span>
            </div>
            <div className={`${styles.statBox} ${styles.endangered}`}>
              <strong>68</strong>
              <span>species are endangered</span>
            </div>
          </div>

          <div className={styles.textColumn}>
            <p className={styles.description}>
              <span className={styles.highlightRed}>22</span> of them are found only in <span className={styles.highlightRed}>Victoria</span>. 
              If we lose them here, we lose them forever. <br />
              Most of these animals depend on forests for survival. But with logging, clearing, and fire, 
              their homes are vanishing — fast.
            </p>
            <p className={styles.description}>
              Source: SPRAT Database, Australian Government (DCCEEW).
            </p>
          </div>
        </div>
      </div>

      <div className={styles.forestThreats}>
        <h2>What’s Breaking Our Forests</h2>
        <div className={styles.threatGrid}>
          {threats.map((t, i) => (
            <div key={i} className={styles.threatCard}>
              <div
                className={styles.threatImage}
                style={{ backgroundImage: `url(${t.image})` }}
              >
                <div className={styles.titleBar}>
                  <h3>{t.title}</h3>
                </div>
              </div>
              <p className={styles.threatText}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Forest Ecology in Victoria</div>
        <div className={styles.carouselWrapper}>
          <button className={styles.arrowLeft} onClick={handlePrev}>
            <ChevronLeft size={32} />
          </button>
          <div className={styles.carouselViewport}>
            <div
              className={styles.carouselInner}
              style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
            >
              {forestImages.map((img, index) => (
                <div className={styles.carouselItem} key={index}>
                  <img src={img} alt={`Forest ${index + 1}`} />
                  <div className={styles.overlay}>
                    <span>{forestLabels[index]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.arrowRight} onClick={handleNext}>
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <div className={styles.sectionTitle}>
        See which species live near you!
      </div>
      <div className={styles.introTitle}>
      This map shows the locations of the top five species that have received the highest level of public concern, as observed and recorded by the Victorian Biodiversity Atlas.
      </div>
      <section className={styles.findBox}>
        <div className={styles.controlsRow}>
          <Input
            className={styles.formWrap}
            placeholder="Please input POSTCODE in VIC"
            value={query.postcode}
            onChange={handlePostcodeChange}
            suffix={<SearchOutlined />}
          />
          <Select
            className={styles.formWrap}
            placeholder="SELECT SPECIES"
            value={query.species_id}
            onChange={handleSpeciesChange}
            options={[
              { value: 0, label: "All Species" },
              { value: 1, label: "Helmeted Honeyeater" },
              { value: 2, label: "Leadbeater’s Possum" },
              { value: 3, label: "Southern Greater Glider" },
              { value: 4, label: "Brush-tailed Rock-wallaby" },
            ]}
          />
        </div>
        <div className={styles.resultsRow}>
          <div className={styles.cardContainer}>
            <section className={styles.card}>
              {loadingInfo ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : info.length > 0 ? (
                info.map((species, idx) => (
                  <section key={idx} className={styles.innerCard}>
                    <img alt="img" src={species.image_url} />
                    <div className={styles.cartTitle}>{species.name}</div>
                    <div className="f20">Status: {species.epbcstatus}</div>
                    <div className="f20">
                      Habitat: {species.eco_type || species.eco_name}
                    </div>
                    <div className="f20">Main Threats:</div>
                    <ul>
                      <li>{species.threats}</li>
                    </ul>
                    <div className="f20">Description:</div>
                    <p>{species.description}</p>
                    <div className="f20">Interesting Facts:</div>
                    <ul>
                      {species.facts
                        ?.split("🔹")
                        .filter((fact) => fact.trim())
                        .map((fact, idx2) => (
                          <li key={idx2}>🔹 {fact.trim()}</li>
                        ))}
                    </ul>
                    <div className="f20">Source:</div>
                    <p>
                      <a
                        href={species.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {species.source}
                      </a>
                    </p>
                    {species.source_notes && (
                      <div className="f20">
                        <p>Source Notes: {species.source_notes}</p>
                      </div>
                    )}
                  </section>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </section>
          </div>
          <section className={styles.mapbox} style={{ position: "relative" }}>
            <MapBox points={points} />
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1000,
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "5px 10px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Count: {points.length}
            </div>
          </section>
        </div>
      </section>
      <ChatWidget />
    </main>
  );
};

export default ExploreSpecies;

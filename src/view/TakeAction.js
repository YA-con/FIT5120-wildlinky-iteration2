import React from 'react';
import styles from './TakeAction.module.css';
import nationalTreeDay from '../assets/national-tree-day.jpg';
import centralHighlands from '../assets/Central-Highlands.png';
import nativeForest from '../assets/Native-Forest.png';
import gellibrand from '../assets/Goolengook-Forest.png';
import littleDesert from '../assets/Little-Desert.png';
import boxIronbark from '../assets/Box-Ironbark.png';
import { useNavigate } from 'react-router-dom';
import HeaderOverlay from '../components/HeaderOverlay';

const TakeAction = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
        <HeaderOverlay />
          <h1>Raise your voice. Make forest protection happen.</h1>
          <p>Be part of the solution – support forest campaigns, sign petitions, and inspire change.</p>
        </div>
      </div>

      <section className={`${styles.section} ${styles.chartSection}`}>
        <h2 className={styles.sectionTitle}>Success stories</h2>
        <p className={styles.sectionIntro}>
          These real victories prove that your voice and actions matter — together, we can protect our forests.
        </p>

        <div className={styles.chartGrid}>
          <a
            href="https://treeday.planetark.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={nationalTreeDay} alt="National Tree Day" />
            <div className={styles.overlay}>
              <h3>National Tree Day – Planet Ark</h3>
              <p>Over 27 million trees planted across Australia with strong community support.</p>
            </div>
          </a>

          <a
            href="https://forcechange.com/552223/success-logging-in-australias-fire-ravished-forests-banned/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={centralHighlands} alt="Logging Stopped in Central Highlands" />
            <div className={styles.overlay}>
              <h3>Logging Stopped in Central Highlands</h3>
              <p>Grassroots action and legal petitions led by WOTCH helped halt destructive logging, saving key habitat.</p>
            </div>
          </a>

          <a
            href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0319531"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={nativeForest} alt="Native Forest Logging Ended Early" />
            <div className={styles.overlay}>
              <h3>Native Forest Logging Ended Early</h3>
              <p>Thanks to pressure from scientists and citizens, Victoria ended native forest logging 6 years ahead of schedule in 2024.</p>
            </div>
          </a>
        </div>

        <div className={styles.chartGrid}>
          <a
            href="https://ejatlas.org/conflict/saving-goolengook-forest-block"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={gellibrand} alt="Goolengook Forest Saved" />
            <div className={styles.overlay}>
              <h3>Goolengook Forest Saved</h3>
              <p>Community-led protest camps and public support led to long-term protection of Goolengook forest in East Gippsland.</p>
            </div>
          </a>

          <a
            href="https://vnpa.org.au/70-years-of-success/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={littleDesert} alt="Little Desert National Park Created" />
            <div className={styles.overlay}>
              <h3>Little Desert National Park Created</h3>
              <p>Public outcry in the 1960s led to the creation of one of Victoria’s first national parks.</p>
            </div>
          </a>

          <a
            href="https://vnpa.org.au/going-the-full-ten-rounds-for-box-ironbark-forests/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={boxIronbark} alt="Box-Ironbark Forests Preserved" />
            <div className={styles.overlay}>
              <h3>Box-Ironbark Forests Preserved</h3>
              <p>Letters and petitions helped secure long-term protection of Victoria’s unique Box-Ironbark woodlands.</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default TakeAction;

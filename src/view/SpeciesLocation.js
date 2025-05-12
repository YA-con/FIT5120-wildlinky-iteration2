import styles from './SpeciesLocation.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MapBox from "../components/MapBox";
import { useSpeciesData } from "../hook/useSpeciesData";
import ChatWidget from "./ChatWidget";
import bgKoala from '../assets/koala.png';
import { useNavigate } from 'react-router-dom';

const SpeciesLocation = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [query, setQuery] = useState({ postcode: "", species_id: 0 });
    const navigate = useNavigate();

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

    const handlePostcodeChange = useCallback((e) => {
        const postcode = e.target.value;
        setQuery((prev) => ({ ...prev, postcode }));
    }, []);

    const handleSpeciesChange = useCallback((species_id) => {
        setQuery((prev) => ({ ...prev, species_id }));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        }, 4000);

        return () => clearInterval(interval);
    }, []);
  
    return (
      <main>
  
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
  
        <div className={styles.sectionTitle}>
            Where Are They Now? — Tracking Threatened Species in a Changing Forest
        </div>
        <div className={styles.introTitle}>
        This map shows how sightings of the top five species that have received the highest level of public concern, as observed and recorded by the Victorian Biodiversity Atlas, overlap with areas of cumulative forest loss in Victoria between 2010 and 2020.
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

        <div className={styles.carouselButtons}>
          <button onClick={() => navigate('/take-action')}>Help them</button>
        </div>

      </main>
    );
  };
  
  export default SpeciesLocation;

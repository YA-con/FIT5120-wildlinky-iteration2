import styles from "./ExploreSpecies.module.css";
import React, { useState, useEffect } from "react";
import { useSpeciesData } from "../hook/useSpeciesData";
import ChatWidget from "./ChatWidget";
import bgKoala from "../assets/koala.png";
import { useNavigate } from "react-router-dom";
const ExploreSpecies = () => {
  const [query] = useState({ postcode: "", species_id: 0 });
  const navigate = useNavigate();

  const { info, loadingInfo, error } = useSpeciesData(query);

  useEffect(() => {
    const interval = setInterval(() => {}, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main>
      <div
        className={styles.speciesStats}
        style={{ backgroundImage: `url(${bgKoala})` }}
      >
        <div className={styles.flexWrapper}>
          <div className={`${styles.statColumn} ${styles.slideInLeft}`}>
            <div className={`${styles.statBox} ${styles.extinct}`}>
              <strong>10</strong>
              <span>species are already extinct.</span>
            </div>
            <div className={`${styles.statBox} ${styles.critical}`}>
              <strong>24</strong>
              <span>
                critically endangered —<br />
                hanging by a thread.
              </span>
            </div>
            <div className={`${styles.statBox} ${styles.endangered}`}>
              <strong>68</strong>
              <span>species are endangered</span>
            </div>
          </div>

          <div className={styles.textColumn}>
            <p className={styles.description}>
              <span className={styles.highlightRed}>22</span> of them are found
              only in <span className={styles.highlightRed}>Victoria</span>. If
              we lose them here, we lose them forever.
            </p>
            <p className={styles.description}>
              Most of these animals depend on forests for survival. But with
              logging, clearing, and fire, their homes are vanishing — fast.
            </p>
            <p className={styles.description}>
              Source:{" "}
              <a
                href="https://www.environment.gov.au/cgi-bin/sprat/public/spratlookupspecies.pl?searchtype=Sciname&name=Diomedea%20antipodensis%20gibsoni"
                target="_blank"
                rel="noopener noreferrer"
              >
                SPRAT Database, Australian Government (DCCEEW)
              </a>.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>
        Where Are They Now? Tracking Threatened Species in a Changing Forest
      </div>
      <div className={styles.introTitle}>
        This map shows how sightings of the top five species that have received
        the highest level of public concern, as observed and recorded by the
        Victorian Biodiversity Atlas, overlap with areas of cumulative forest
        loss in Victoria between 2010 and 2020.
      </div>

      <section className={styles.findBox}>
        <div className={styles.resultsRow}>
          <section className={styles.mapbox}>
            <iframe
              src="/species_forest_loss_final_cleaned.html"
              width="100%"
              height="1000px"
              style={{ border: "none" }}
              title="Species & Forest Loss Map"
            />
          </section>
          <div className={styles.cardContainer}>
            {loadingInfo ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : info.length > 0 ? (
              info.map((species, idx) => (
                <div key={idx} className={styles.card}>
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
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
          </div>
      </section>

      <div className={styles.sectionTitle}>
        At This Rate, Victoria’s Native Fauna May Cross 1000 Threatened Species by 2034
      </div>
      <div className={styles.introTitle}>
        Every year, more of Victoria’s unique animals are being added to the threatened species list.<br />
        This chart shows the cumulative rise in threatened fauna from 2001 to today.<br />
        <span className={styles.redText}>
        If current patterns continue, over 1000 species could be under threat by 2034, just 10 years from now.<br />
        </span>
        This isn’t just a statistic — it's a warning, and you can be part of what changes this.
      </div>
      <section className={styles.findBox}>
        <div className={styles.resultsRow}>
          <section className={styles.mapbox}>
            <div style={{ width: "100%", height: "100vh", overflowY: "auto" }}>
              <iframe
                src="/final_rf_projection_1000_impactful.html"
                width="100%"
                height="100%"
                style={{ border: "none", minHeight: "100vh" }}
                title="Species & Forest Loss Map"
              />
            </div>
          </section>
        </div>
      </section>

      <ChatWidget />

      <div className={styles.carouselButtons}>
        <button onClick={() => navigate("/policy")}>Explore Policies</button>
      </div>
    </main>
  );
};

export default ExploreSpecies;
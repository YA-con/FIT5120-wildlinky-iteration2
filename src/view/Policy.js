import React, { useState } from "react";
import styles from "./Policy.module.css";
import nationalTreeDay from '../assets/national-tree-day.jpg';
import centralHighlands from '../assets/Central-Highlands.png';
import nativeForest from '../assets/Native-Forest.png';
import gellibrand from '../assets/Goolengook-Forest.png';
import littleDesert from '../assets/Little-Desert.png';
import boxIronbark from '../assets/Box-Ironbark.png';
import banner from "../assets/take-action.jpg";
import Quiz from "./Quiz";
import { useNavigate } from "react-router-dom";
import HeaderOverlay from '../components/HeaderOverlay';
import PolicyModal from "./PolicyModal";

const TakeAction = () => {
  const [openIndex, setOpenIndex] = useState(5);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([null, null, null, null]);
  const [quizResult, setQuizResult] = useState(null); // null | 'suspicious' | 'clear'

  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const closeQuizModal = () => {
    setQuizAnswers([null, null, null, null]);
    setShowQuizModal(false);
  };

  const handleQuizSubmit = () => {
    const [permit, protectedArea, nativeForest, secretClearing] = quizAnswers;

    let suspicious = false;
    if (permit === "No") suspicious = true;
    if (protectedArea === "Yes") suspicious = true;
    if (nativeForest === "Yes") suspicious = true;
    if (secretClearing === "Yes") suspicious = true;

    if (suspicious) {
      setQuizResult("suspicious");
    } else {
      setQuizResult("clear");
    }
  };

  const updateAnswer = (index, value) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = value;
    setQuizAnswers(newAnswers);
  };

  const accordionData = [
    {
      title: "Flora and Fauna Guarantee Act 1988 (FFG Act)",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> This law protects Victoria’s
            threatened species and their habitats. It requires the government
            and public bodies to act in ways that conserve biodiversity.
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> It makes it illegal to harm
            listed species and lets people challenge harmful developments.
          </p>
          <p>
            📄 <strong>Status:</strong> In Effect
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.legislation.vic.gov.au/in-force/acts/flora-and-fauna-guarantee-act-1988"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.legislation.vic.gov.au/in-force/acts/flora-and-fauna-guarantee-act-1988
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "Biodiversity 2037 Strategy",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> This strategy is Victoria’s
            long-term plan to improve the health of species and ecosystems by
            2037. It sets goals for stopping biodiversity decline and tracking
            progress with data.
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> It guides investment in habitat
            protection and shows if policies are actually working.
          </p>
          <p>
            📄 <strong>Status:</strong> Progress tracked annually
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.environment.vic.gov.au/biodiversity/biodiversity-plan"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.environment.vic.gov.au/biodiversity/biodiversity-plan
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "Planning and Environment Act 1987",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> This act controls how land is
            used and developed. It requires permits for clearing native
            vegetation unless exempt.
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> Local councils use this law to
            approve or reject forest-clearing projects.
          </p>
          <p>
            📄 <strong>Status:</strong> In Use — Councils apply this daily
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.planning.vic.gov.au/guides-and-resources/legislation-regulation-and-fees/legislation-and-regulations"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.planning.vic.gov.au/guides-and-resources/legislation-regulation-and-fees/legislation-and-regulations
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "Victorian Forest Plan (2024 Logging Ban)",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> Victoria has committed to
            ending all native forest logging on public land by 2024. This plan
            supports workers transitioning out of the logging industry.
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> It permanently protects millions
            of trees and reduces emissions from logging.
          </p>
          <p>
            📄 <strong>Status:</strong> Logging officially ended Jan 2024
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.premier.vic.gov.au/protecting-victorias-biodiversity-future-generations"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.premier.vic.gov.au/protecting-victorias-biodiversity-future-generations
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "Environment Effects Act 1978",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> Big projects that might harm
            the environment (like large-scale logging or road development) need
            an Environment Effects Statement (EES).
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> This gives the public a chance
            to review and oppose harmful developments.
          </p>
          <p>
            📄 <strong>Status:</strong> Required for major proposals
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.planning.vic.gov.au/environmental-assessments/environmental-assessment-guides/ministerial-guidelines-for-assessment-of-environmental-effects"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.planning.vic.gov.au/environmental-assessments/environmental-assessment-guides/ministerial-guidelines-for-assessment-of-environmental-effects
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "Regional Forest Agreements (RFAs)",
      content: (
        <div>
          <p>
            📄 <strong>What it is about:</strong> RFAs are long-term deals
            between Victoria and the federal government on how forests are used.
            They balance conservation with industries like timber.
          </p>
          <p>
            🌿 <strong>Why it matters:</strong> They've shaped how forests were
            logged and conserved for decades.
          </p>
          <p>
            📄 <strong>Status:</strong> Being reviewed post-logging phase-out
          </p>
          <p>
            🔗<strong>Link:</strong>{" "}
            <a
              href="https://www.agriculture.gov.au/agriculture-land/forestry/policies/rfa"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.agriculture.gov.au/agriculture-land/forestry/policies/rfa
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
        <HeaderOverlay />
          <h1>Clear Policies. Stronger Voice.</h1>
          <p>
            Under the EPBC Act, anyone can speak up and report activities that
            may harm Australia’s wildlife and their habitats!
          </p>
        </div>
      </div>
      <section className={styles.policySection}>
        <h2 className={`${styles.sectionTitle} ${styles.underlinedTitle}`}>
          🌱 WHY YOUR VOICE MATTERS ?
        </h2>
        <div className={styles.card}>
          <p>
            Policies determine how much forest get cleared, species are
            protected, and who is held accountable. One report, email, or vote
            could help save the forest.
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h2 className={`${styles.sectionTitle} ${styles.underlinedTitle}`}>
          WHAT YOU CAN DO ?
        </h2>
        <div className={styles.actionCards}>
          <div className={styles.card}>
            <img src="/logging.png" alt="logging" />
            <h3>REPORT ILLEGAL LOGGING</h3>
            <p>If you see forests being cleared illegally, make a report.</p>
            <button
              onClick={() => setShowQuizModal(true)}
              className={styles.yellowButton}
            >
              Report to local council
            </button>
          </div>
          <div className={styles.card}>
            <img src="/vote.png" alt="vote" />
            <h3>VOTE FOR NATURE</h3>
            <p>Elect representatives with positive forest policies.</p>
            <button
              onClick={() => setShowPolicyModal(true)}
              className={styles.yellowButton}
            >
              Look up your MP
            </button>
          </div>
          <div className={styles.card}>
            <img src="/email.png" alt="email" />
            <h3>SEND A POLICY EMAIL</h3>
            <p>Ask local representatives to safeguard forests.</p>
            <button
              onClick={() => navigate("/email")}
              className={styles.yellowButton}
            >
              Create a draft email
            </button>
          </div>
        </div>
      </section>

      {showQuizModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.quizWrapper}`}>
            <button className={styles.closeButton} onClick={closeQuizModal}>
              ×
            </button>
            <h3>DO YOU SEE ANY CLEARING ILLEGAL?</h3>
            <p className={styles.intro}>
              Under the EPBC Act, anyone can report illegal land clearing that
              threatens endangered species.
            </p>
            {[
              "Is there a permit or sign posted?",
              "Is it happening inside a national park, reserve, or known protected area?",
              "Is the area being cleared mainly native forest or critical habitat (not garden plants)?",
              "Is the clearing large-scale and no public notice was posted about it?",
            ].map((q, i) => (
              <div className={styles.quizQuestion} key={i}>
                <p>
                  {i + 1}. {q}
                </p>
                <div className={styles.quizOptions}>
                  {["Yes", "No", "Not sure"].map((opt) => (
                    <label key={opt}>
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        onChange={() => updateAnswer(i, opt)}
                        checked={quizAnswers[i] === opt}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
              className={styles.quizSubmitButton}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {showPolicyModal && (
        <PolicyModal onClose={() => setShowPolicyModal(false)} />
      )}

      <section>
        <h2 className={styles.sectionTitle}>Get Informed</h2>
        <div className={styles.accordionWrapper}>
          {accordionData.map((item, index) => (
            <div
              key={index}
              className={styles.accordionItem}
              onClick={() => toggleAccordion(index)}
            >
              <div>{item.title}</div>
              <div className={styles.accordionIcon}>
                {openIndex === index ? "−" : "+"}
              </div>
              {openIndex === index && item.content && (
                <div className={styles.accordionContent}>{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Test Your Knowledge</h2>
        <div className={styles.card}>
          {quizStarted ? (
            <Quiz onQuit={() => setQuizStarted(false)} />
          ) : (
            <>
              <p>
                Ready to check what you’ve learned about forest protection
                policies? Take a short quiz to reinforce your understanding and
                get helpful feedback.
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.actionButton}
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      {quizResult && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>
              {quizResult === "suspicious"
                ? "🚨 This looks suspicious."
                : "✅ All clear!"}
            </h3>
            <p>
              {quizResult === "suspicious"
                ? "This may indicate illegal clearing. Please report it to your local council or the environment department."
                : "No immediate concerns detected. Thank you for staying alert and helping to protect our forests!"}
            </p>
            <div className={styles.buttonGroup}>
              {quizResult === "suspicious" ? (
                <button
                  className={styles.quizSubmitButton}
                  onClick={() => {
                    setQuizResult(null);
                    closeQuizModal();
                    navigate("/email");
                  }}
                >
                  Report Now
                </button>
              ) : (
                <button
                  className={styles.quizSubmitButton}
                  onClick={() => {
                    setQuizResult(null);
                    closeQuizModal();
                  }}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeAction;
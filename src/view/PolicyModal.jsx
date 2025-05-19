import React, { useEffect, useState } from "react";
import styles from "./Policy.module.css";

const PolicyModal = ({ onClose }) => {
  const [policies, setPolicies] = useState([]);
  const [showAll, setShowAll] = useState({});

  useEffect(() => {
    fetch("https://fit5120-t28-wildlinky.onrender.com/api/policies-with-supporters")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.policyModalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.sectionTitle}>Parliamentary Votes on Australia's Environmental 
        Future</h2>
        <p
          style={{
            color: "#911",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          These are key national issues that have been voted on in the
          Australian Parliament — including topics like forest protection,
          wildlife conservation, and climate action.
          <br />
          We show which elected representatives have supported or opposed these
          policies based on how they voted in Parliament.
        </p>

        <div className={styles.policyGrid}>
          {policies.map((policy) => (
            <div key={policy.id} className={styles.policyCard}>
              <h3>🌱 {policy.name}</h3>
              <p>{policy.description}</p>
              <p>
                <strong>Supporters in Victoria:</strong>
              </p>
              {policy.supporters.length > 0 ? (
                <>
                  <ul>
                    {(showAll[policy.id]
                      ? policy.supporters
                      : policy.supporters.slice(0, 3)
                    ).map((s, idx) => (
                      <li key={idx}>
                        ✅ <strong>{s.full_name}</strong>, {s.party}
                      </li>
                    ))}
                  </ul>
                  {policy.supporters.length > 3 && (
                    <button
                      className={styles.showMoreButton}
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          [policy.id]: !prev[policy.id],
                        }))
                      }
                    >
                      {showAll[policy.id] ? "− Less" : "+ More"}
                    </button>
                  )}
                </>
              ) : (
                <p style={{ fontStyle: "italic", color: "#555" }}>None</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;

import styles from './Email.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOverlay from '../components/HeaderOverlay';

const issueOptions = [
  'Logging',
  'Bushfires',
  'Land Clearing',
  'Urban Expansion',
  'Agricultural Expansion',
  'Report logging',
  'Report land clearing'
];

const modifierOptions = {
  Length: ['Auto', 'Detailed', 'Short'],
  Style: ['Auto', 'Creative', 'Inspiring', 'Professional'],
  Tone: ['Auto', 'Casual', 'Formal', 'Friendly', 'Professional'],
  Mood: ['Auto', 'Empathetic', 'Enthusiastic', 'Unhappy', 'Urgent']
};

const Email = () => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [policyFocus, setPolicyFocus] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modSettings, setModSettings] = useState({});
  const [copied, setCopied] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [council, setCouncil] = useState(null);
  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');
  const navigate = useNavigate();

  const handleModifierSelect = (key, value) => {
    setModSettings(prev => ({ ...prev, [key]: value }));
  };

  const [modDropdowns, setModDropdowns] = useState({
    Length: false,
    Style: false,
    Tone: false,
    Mood: false
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
  };

  const handlePostcodeSearch = async () => {
  const trimmed = postcode.trim();

  if (!/^\d+$/.test(trimmed)) {
    setValidationMsg('❌ Postcode can only contain numbers!');
    setCouncil(null);
    return;
  }

  if (trimmed.length !== 4) {
    setValidationMsg('❌ Please enter a 4-digit postcode!');
    setCouncil(null);
    return;
  }

  try {
    const res = await fetch(`https://fit5120-t28-wildlinky.onrender.com/api/council?postcode=${trimmed}`);


    const data = await res.json();

    if (data && data.name) {
      setCouncil(data);
      setValidationMsg('');
    } else {
      setCouncil(null);
      setValidationMsg('❌ This is an invalid postcode!');
    }
  } catch (err) {
    console.error('Error fetching council info:', err);
    setValidationMsg('❌ The query failed. Please try again later.');
    setCouncil(null);
  }
};
  const handleGenerate = async () => {
  if (!selectedIssue) {
    alert('Please select an issue before generating.');
    return;
  }

  setLoading(true);
  setCopied(false);

  try {
    const res = await fetch('https://fit5120-t28-wildlinky.onrender.com/api/generate-email', {


      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issue: selectedIssue,
        focus: policyFocus,
        modifiers: modSettings
      })
    });

    const data = await res.json();
    console.log("📨 Response from backend:", data);

    if (data.error) {
      setEmailContent(`⚠️ ${data.error}`);
    } else {
      setEmailContent(data.email || '⚠️ No content returned');
    }
  } catch (err) {
    console.error('❌ Network or server error:', err);
    setEmailContent('❌ Failed to connect to the backend.');
  } finally {
    setLoading(false);
  }
};
  return (
    <main className={styles.contailer}>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <HeaderOverlay />
          <h1>Turn Your Frustration Into Action.</h1>
          <p>
            Find the right words to speak for the forests — backed by facts, policies, and a clear message.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          <div style={{ flex: 1 }}>
            <div className={styles.postcodeSection}>
              <h2 className={styles.headerTitle}>1. Find Your Local Council</h2>
              <h2 className={styles.subTitle}>Input Your Postcode:</h2>
              <div className={styles.postcodeSearchGroup}>
                <input
                  type="text"
                  className={styles.postcodeInput}
                  placeholder="Enter your postcode"
                  value={postcode}
                  maxLength={4}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setValidationMsg('');
                    setCouncil(null);
                  }}
                />
                <button
                  className={styles.searchBtn}
                  onClick={handlePostcodeSearch}
                >
                  Search
                </button>
              </div>

              {validationMsg && <p className={styles.invalidMsg}>{validationMsg}</p>}

              {council && (
                <div className={styles.councilInfoBox}>
                  <h3>{council.name}</h3>
                  <p><strong>Email:</strong> {council.email}</p>
                  <p><strong>Phone:</strong> {council.phone}</p>
                  <p><strong>Address:</strong> {council.address}</p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a href={council.website} target="_blank" rel="noopener noreferrer">
                      {council.website}
                    </a>
                  </p>
                </div>
              )}
            </div>

            <h1 className={styles.headerTitle}>2. Draft Your Advocacy Email</h1>
            <section className={styles.formLayout}>
              <label className={styles.subTitle}>Select an Issue:</label>
              <div className={styles.customSelectWrapper}>
                <div
                  className={styles.customSelectHeader}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {selectedIssue || 'Select an issue'}
                  <span className={styles.arrow}></span>
                </div>
                {dropdownOpen && (
                  <ul className={styles.customSelectList}>
                    {issueOptions.map((option) => (
                      <li
                        key={option}
                        className={styles.customSelectItem}
                        onClick={() => {
                          setSelectedIssue(option);
                          setDropdownOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className={styles.subTitle}>Optional: Add your specific concern or policy focus</label>
              <textarea
                className={styles.textarea}
                value={policyFocus}
                onChange={(e) => setPolicyFocus(e.target.value)}
                placeholder="Type your policy focus here..."
              />

              <div className={styles.modifierGrid}>
                {Object.keys(modifierOptions).map((mod) => (
                  <div className={styles.modifierBox} key={mod}>
                    <div className={styles.modifierTitle}>{mod}</div>
                    <div className={styles.customSelectWrapper}>
                      <div
                        className={styles.customSelectHeader}
                        onClick={() =>
                          setModDropdowns(prev => ({
                            ...prev,
                            [mod]: !prev[mod]
                          }))
                        }
                      >
                        {modSettings[mod] || 'Auto'}
                        <span className={styles.arrow}></span>
                      </div>
                      {modDropdowns[mod] && (
                        <ul className={styles.customSelectList}>
                          {modifierOptions[mod].map((opt) => (
                            <li
                              key={opt}
                              className={styles.customSelectItem}
                              onClick={() => {
                                handleModifierSelect(mod, opt);
                                setModDropdowns(prev => ({ ...prev, [mod]: false }));
                              }}
                            >
                              {opt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={styles.generateBtn}
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? 'Generating...' : '✨ Generate My Email'}
              </button>

              <label className={styles.subTitle}>Generated Email:</label>
              <textarea
                className={styles.textarea}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Your AI-generated email will appear here..."
              />

              <div style={{ display: 'flex', gap: '16px' }}>
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? '✅ Copied!' : 'Copy to Clipboard'}
                </button>
                <button className={styles.moreBtn} onClick={() => navigate('/your-way')}>
                  Choose Your Way to Act
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Email;

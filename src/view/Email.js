import styles from './Email.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const issueOptions = [
    'Logging',
    'Bushfires',
    'Land Clearing',
    'Urban Expansion',
    'Agricultural Expansion'
];

const Email = () => {
    const [selectedIssue, setSelectedIssue] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [policyFocus, setPolicyFocus] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [council, setCouncil] = useState(null);
    const [invalidPostcode, setInvalidPostcode] = useState(false);
    const navigate = useNavigate();

    const postcodeToCouncil = {
        "3000": {
          name: "City of Melbourne",
          email: "enquiries@melbourne.vic.gov.au",
          phone: "(04) 9658 9658",
          website: "https://www.melbourne.vic.gov.au"
        },
        "3052": {
          name: "City of Moonee Valley",
          email: "council@mvcc.vic.gov.au",
          phone: "(04) 9243 8888",
          website: "https://www.mvcc.vic.gov.au"
        },
        "3145": {
          name: "City of Monash",
          email: "mail@monash.vic.gov.au",
          phone: "(04) 9518 3555",
          website: "https://www.monash.vic.gov.au"
        },
        "3741": {
          name: "Alpine Shire Council",
          email: "info@alpineshire.vic.gov.au",
          phone: "(04) 5755 0555",
          website: "https://www.alpineshire.vic.gov.au"
        },
        "3377": {
          name: "Ararat Rural City Council",
          email: "council@ararat.vic.gov.au",
          phone: "(04) 5355 0200",
          website: "https://www.ararat.vic.gov.au"
        },
        "3350": {
          name: "Ballarat City Council",
          email: "info@ballarat.vic.gov.au",
          phone: "(04) 5320 5500",
          website: "https://www.ballarat.vic.gov.au"
        },
        "3088": {
          name: "Banyule City Council",
          email: "enquiries@banyule.vic.gov.au",
          phone: "(04) 9490 4222",
          website: "https://www.banyule.vic.gov.au"
        },
        "3995": {
          name: "Bass Coast Shire Council",
          email: "basscoast@basscoast.vic.gov.au",
          phone: "(04) 1300 BCOAST (226278)",
          website: "https://www.basscoast.vic.gov.au"
        },
        "3818": {
          name: "Baw Baw Shire Council",
          email: "bawbaw@bawbawshire.vic.gov.au",
          phone: "(04) 5624 2411",
          website: "https://www.bawbawshire.vic.gov.au"
        },
        "3191": {
          name: "Bayside City Council",
          email: "enquiries@bayside.vic.gov.au",
          phone: "(04) 9599 4444",
          website: "https://www.bayside.vic.gov.au"
        }
    };
  


    useEffect(() => {
        if (postcode.length === 4) {
            const info = postcodeToCouncil[postcode];
            if (info) {
                setCouncil(info);
                setInvalidPostcode(false);
            } else {
                setCouncil(null);
                setInvalidPostcode(true);
            }
        } else {
            setCouncil(null);
            setInvalidPostcode(false);
        }
    }, [postcode]);

    const generateEmail = async (issue, focusText = '') => {
        setLoading(true);
        setCopied(false);
        try {
            const res = await fetch('http://localhost:5001/api/generate-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ issue, focus: focusText })
            });
            const data = await res.json();
            if (res.ok) {
                setEmailContent(data.email);
            } else {
                setEmailContent(`⚠️ Failed to generate email: ${data.error}`);
            }
        } catch (err) {
            console.error("[Connection Error]", err);
            setEmailContent("⚠️ Could not reach the server. Please check connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = async (value) => {
        setSelectedIssue(value);
        setPolicyFocus('');
        if (value) await generateEmail(value);
        else setEmailContent('');
    };

    const handlePolicyFocusChange = (e) => {
        const focus = e.target.value;
        setPolicyFocus(focus);
        if (selectedIssue) generateEmail(selectedIssue, focus);
    };

    const handleCopy = () => {
        if (!emailContent.trim()) {
            alert("Nothing to copy. Please generate or write an email.");
            return;
        }
        navigator.clipboard.writeText(emailContent);
        setCopied(true);
    };

    return (
        <main className={styles.contailer}>
            <div className={styles.banner}>
                <div className={styles.bannerOverlay}>
                    <h1>Turn Your Frustration Into Action.</h1>
                    <p>Find the right words to speak for the forests — backed by facts, policies, and a clear message.</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.postcodeSection}>
                    <h2 className={styles.headerTitle}>Find Your Local Council</h2>
                    <h2 className={styles.subTitle}>Input Your Postcode:</h2>
                    <input
                        type="text"
                        className={styles.postcodeInput}
                        placeholder="Enter your postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                    {council && (
                        <div className={styles.councilInfoBox}>
                            <h3>{council.name}</h3>
                            <p><strong>Email:</strong> {council.email}</p>
                            <p><strong>Phone:</strong> {council.phone}</p>
                            <p><strong>Website:</strong> <a href={council.website} target="_blank" rel="noreferrer">{council.website}</a></p>
                        </div>
                    )}
                    {invalidPostcode && <p className={styles.invalidMsg}>Invalid postcode. Try a Victorian postcode.</p>}
                </div>

                <h1 className={styles.headerTitle}>Draft Your Advocacy Email</h1>
                <section className={styles.formLayout}>
                    <label className={styles.subTitle}>Select an Issue:</label>
                    <select className={styles.selectBox} value={selectedIssue} onChange={(e) => handleSelect(e.target.value)}>
                        <option value="">Select an issue</option>
                        {issueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>

                    <label className={styles.subTitle}>Add Specific Policy or Focus (Optional):</label>
                    <textarea
                        className={styles.textarea}
                        placeholder="e.g., stricter native forest protections..."
                        value={policyFocus}
                        onChange={handlePolicyFocusChange}
                        disabled={loading || !selectedIssue}
                    />

                    <label className={styles.subTitle}>Your Email:</label>
                    <textarea
                        className={styles.textarea}
                        value={loading ? "Generating email, please wait..." : emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        disabled={loading}
                    />

                    <button className={styles.copyBtn} onClick={handleCopy} disabled={!emailContent}>
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>

                    <button className={styles.moreBtn} onClick={() => navigate('/take-action')}>
                        More action
                    </button>
                </section>
            </div>
        </main>
    );
};

export default Email;
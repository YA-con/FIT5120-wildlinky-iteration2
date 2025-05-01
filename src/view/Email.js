import styles from './Email.module.css';
import React, { useState, useEffect } from 'react';

const issueOptions = [
    'Logging',
    'Bushfires',
    'Land Clearing',
    'Urban Expansion',
    'Agricultural Expansion'
];

const emailTemplates = {
    "Logging": `Subject: Urgent Action Needed to Address Logging in Victoria
  
  Dear Council,
  
  I am writing to express deep concern about the ongoing logging of native forests in Victoria. These forests are vital to the survival of many species and play a critical role in maintaining the health of our environment.
  
  Clear-felling and unsustainable harvesting practices are not only destroying valuable habitat but also undermining decades of conservation progress. With biodiversity under increasing threat, it is more important than ever to protect what remains. Forests support water quality, reduce erosion, and help regulate our climate — their loss affects us all.
  
  I urge you to prioritise sustainable land management practices and strengthen protections for remaining native forests. Increased investment in forest restoration, stricter logging regulations, and community engagement can ensure a more balanced approach that benefits both people and nature.
  
  Your leadership on this issue can help preserve Victoria’s natural heritage for future generations. Please take meaningful action now to limit further damage and promote long-term solutions.
  
  Sincerely,  
  A concerned Victorian resident`,
    
    "Bushfires": `Subject: Strengthening Forest Resilience Against Bushfires
  
  Dear Council,
  
  I am writing to urge stronger measures to protect our forests from increasingly severe bushfires. Recent fire seasons in Victoria have caused devastating losses to both communities and ecosystems, with millions of hectares burned and critical habitat destroyed.
  
  As climate change accelerates, our fire seasons are becoming longer and more intense. Without proactive action, the risk to our forests and the species that rely on them will continue to grow. This includes implementing prescribed burning programs with ecological sensitivity, improving early detection systems, and investing in fire-resilient vegetation recovery.
  
  Councils have an important role to play in fostering local fire preparedness and protecting vulnerable natural areas. I respectfully ask that you consider strengthening local policies, supporting community education, and working with state and federal authorities to secure long-term forest protection.
  
  Taking action now will help safeguard both our environment and our communities from future disasters.
  
  Sincerely,  
  A concerned Victorian resident`,
  
    "Land Clearing": `Subject: Immediate Attention Required on Land Clearing Practices
  
  Dear Council,
  
  I am writing to highlight the urgent need to address land clearing in Victoria. Widespread clearing for development, agriculture, and infrastructure is rapidly eroding native habitats and placing increasing pressure on endangered species.
  
  These habitats are not just homes for wildlife — they are vital to the health of our ecosystems. The removal of trees and undergrowth disrupts biodiversity, increases soil erosion, and contributes to climate change. In Victoria, over 700 native species are threatened, many due to habitat loss from clearing.
  
  I urge you to enforce stricter regulations on land clearing and prioritise land-use planning that balances growth with environmental protection. Supporting habitat restoration programs, working with private landowners, and preserving remnant vegetation are practical steps that can make a lasting impact.
  
  I appreciate your role in shaping a more sustainable future for Victoria and ask for your commitment to reducing unnecessary land clearing.
  
  Sincerely,  
  A concerned Victorian resident`,
  
    "Urban Expansion": `Subject: Addressing Environmental Impact of Urban Expansion
  
  Dear Council,
  
  I am writing to express concern about the environmental effects of continued urban expansion in Victoria. As cities and suburbs grow, they often encroach upon vital natural habitats, placing native species at risk and degrading important ecosystems.
  
  While population growth is inevitable, the way we plan and manage that growth matters. Urban sprawl contributes to the fragmentation of forests, loss of biodiversity, and increased pollution. Once these areas are lost, they are rarely restored to their natural state.
  
  I respectfully urge you to adopt planning strategies that prioritise environmental conservation. This includes setting aside green corridors, protecting remaining bushland, and integrating nature into urban design. Compact, well-planned communities can meet housing needs while preserving the ecosystems that make Victoria unique.
  
  Your decisions today will shape the legacy we leave for future generations. Please ensure that nature remains a central part of Victoria’s urban future.
  
  Sincerely,  
  A concerned Victorian resident`,
  
    "Agricultural Expansion": `Subject: Balancing Agriculture and Habitat Conservation
  
  Dear Council,
  
  I am writing to raise the issue of habitat loss caused by agricultural expansion across Victoria. While farming is an essential part of our economy, it must be managed in a way that safeguards the natural environment.
  
  Clearing land for agriculture often results in the destruction of forests, wetlands, and native grasslands — key habitats for many threatened species. Over time, this undermines soil health, water quality, and the resilience of our landscapes. Sustainable farming practices can reduce this impact while maintaining productivity.
  
  I urge your council to support policies that encourage conservation-friendly agriculture. Incentives for revegetation, stricter limits on clearing, and collaboration with landholders can all contribute to a healthier environment.
  
  With thoughtful action, we can protect Victoria’s biodiversity while supporting a thriving agricultural sector.
  
  Sincerely,  
  A concerned Victorian resident`
};

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
  
const Email = () => {
    const [selectedIssue, setSelectedIssue] = useState('');
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [council, setCouncil] = useState(null);
    const allowEdit = selectedIssue !== '';

    const handleSelect = (value) => {
        setSelectedIssue(value);
        const template = emailTemplates[value] || '';
        setMessage(template);
        setCopied(false);
    };

    const handleCopy = () => {
        if (!message.trim()) {
            alert('Please generate or write a message before copying.');
            return;
        }

        navigator.clipboard.writeText(message);
        setCopied(true);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure to delete template content?')) {
            setSelectedIssue('');
            setMessage('');
            setCopied(false);
        }
    };

    useEffect(() => {
        if (postcode.length === 4 && postcodeToCouncil[postcode]) {
          setCouncil(postcodeToCouncil[postcode]);
        } else {
          setCouncil(null);
        }
      }, [postcode]);
    
    return (
        <main className={styles.contailer}>
            <div className={styles.banner}>
                <div className={styles.bannerOverlay}>
                    <h1>
                    Turn Your Frustration Into Action.
                    </h1>
                    <p>
                    Find the right words to speak for the forests — backed by facts, policies, and a clear message.
                    </p>
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
                        <p>
                            <strong>Website:</strong>{' '}
                            <a href={council.website} target="_blank" rel="noopener noreferrer">
                            {council.website}
                            </a>
                        </p>
                        </div>
                    )}
                </div>

                <h1 className={styles.headerTitle}>Draft Your Advocacy Email</h1>
                <section className={styles.flexLayout}>
                    <div className={styles.left}>
                        <h2 className={styles.subTitle}>Select an Issue:</h2>
                        <select
                            className={styles.selectBox}
                            value={selectedIssue}
                            onChange={(e) => handleSelect(e.target.value)}
                        >
                            <option value="">Select an issue</option>
                            {issueOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>

                        {!allowEdit && (
                            <p className={styles.note}>Please choose an issue to begin drafting your message.</p>
                        )}
                        <textarea
                            className={styles.textarea}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={!allowEdit}
                        />
                        <button className={styles.clearBtn} onClick={handleClear}>
                            Clear template
                        </button>
                    </div>

                    <div className={styles.right}>
                        <h2 className={styles.subTitle}>Live Preview</h2>
                        <div className={styles.previewBox}>{message}</div>
                        <button className={styles.copyBtn} onClick={handleCopy}>
                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};
export default Email;
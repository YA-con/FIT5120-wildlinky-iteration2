import React from 'react';
import styles from './ReadMoreBiodiversity.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const forestTypes = [

    {
        title: '1. Wet Eucalypt Forests (e.g. Central Highlands, East Gippsland)',
        img: 'https://live.staticflickr.com/4100/4782570338_28c543669d_b.jpg',
        species: 'Leadbeater’s possum, greater glider, powerful owl',
        link: 'Listed as priority habitat zones under Biodiversity 2037.',
        policies: [
        'Biodiversity 2037: Targets protection of species reliant on old-growth forests.',
        'Forest Management Plans: Central Highlands & East Gippsland (e.g., 1998 plan, 1995 plan)',
        'Logging phase-out by 2030 aims to reduce biodiversity threats.'
        ]
    },
    {
        title: '2. Dry Forests & Box-Ironbark Woodlands (e.g. Midlands, North East, Bendigo)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Box-Ironbark_Forest%2C_Jindalee_National_Park.jpg',
        species: 'Swift parrot, brush-tailed phascogale, regent honeyeater',
        link: 'Identified as fragmented ecosystems needing targeted habitat restoration.',
        policies: [
        'Biodiversity 2037: Emphasizes "improving habitat connectivity"',
        'Forest Management Plans: Midlands 1996, North East 2001, Bendigo 2008',
        'Landcare and revegetation programs supported by Catchment Management Authorities'
        ]
    },
    {
        title: '3. Rainforests (e.g. Otways, East Gippsland gullies)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Rain_forest%2C_Victoria_Falls%2C_Zimbabwe_%2814350023147%29.jpg',
        species: 'Spot-tailed quoll, tree ferns, rare orchids',
        link: 'These forests are rare and sensitive — a top priority for permanent protection.',
        policies: [
        'National parks (e.g. Great Otway NP) and Special Protection Zones',
        'Protected under Regional Forest Agreements (RFA)',
        'Biodiversity 2037 focuses on protecting "rare and threatened vegetation types"'
        ]
    },
    {
        title: '4. Alpine & Subalpine Forests (e.g. Alpine National Park)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Subalpine-alpine_Vegetation-Suenseralpe-04.jpg',
        species: 'Mountain pygmy-possum, broad-toothed rat',
        link: 'At risk from climate change — listed in adaptation strategies.',
        policies: [
        'Alpine & Bogong Management Plans',
        'Biodiversity 2037 includes alpine species in its “climate change response priorities”'
        ]
    }
];

const ReadMoreBiodiversity = () => {

    const navigate = useNavigate();
    
    return (
        <main className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link to="/" className={styles.breadcrumbLink}>Home</Link> / Biodiversity Forest Types
            </div>

            <h1 className={styles.title}>Forest Types in Victoria & Their Connection to Biodiversity Policies</h1>
            <p className={styles.subtext}>
                Victoria’s <strong>Biodiversity 2037</strong> strategy and <strong>forest management policies</strong> aim to protect key ecosystems
                by prioritising forest types with high biodiversity value.
            </p>

            <div className={styles.source}>
                (Source: <a href="https://www.forestsandreserves.vic.gov.au" target="_blank" rel="noreferrer">Forest management plans</a>)
            </div>

            {forestTypes.map((item, index) => (
                <section className={styles.forestBlock} key={index}>
                    <h2 className={styles.forestTitle}>{item.title}</h2>
                    <img src={item.img} alt={item.title} className={styles.forestImg} />
                    <ul className={styles.forestInfo}>
                        <li><strong>Key Species:</strong> {item.species}</li>
                        <li><strong>Biodiversity Plan Link:</strong> {item.link}</li>
                        <li><strong>Policy Framework:</strong>
                        <ul>
                            {item.policies.map((policy, i) => (
                            <li key={i}>{policy}</li>
                            ))}
                        </ul>
                        </li>
                    </ul>
                    {index < forestTypes.length - 1 && (
                        <hr className={styles.divider} />
                    )}
                </section>
            ))}

            <div className={styles.buttonContainer}>
                <button className={styles.ctaButton} onClick={() => navigate('/take-action')}>
                    Take Action
                </button>
            </div>
        </main>
    );
};

export default ReadMoreBiodiversity;

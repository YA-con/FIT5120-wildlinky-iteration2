import React from 'react';
import styles from './ReadMoreForest.module.css';
import forestLossImg from '../assets/forest-loss-visual.png';
import forestPieImg from '../assets/forest-loss-pie.png';
import { Link } from 'react-router-dom';

const ReadMoreForest = () => {
    return (
        <main className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link to="/" className={styles.breadcrumbLink}>Home</Link> / Forest Loss
            </div>

            <section className={styles.intro}>
                <h1 className={styles.title}>Victoria’s Forests: More Than Just Trees</h1>
                <p className={styles.text}>
                    Victoria’s forests are more than just trees—they’re living ecosystems that shelter some
                    of Australia’s most unique and threatened species. From the misty mountain ash forests
                    of the Central Highlands to the sun-drenched woodlands of the west, these landscapes
                    are woven into the identity and biodiversity of the state.
                </p>
            </section>

            <section className={styles.imageSection}>
                <img src={forestLossImg} alt="Victoria's Forest Loss" className={styles.img} />
                <p className={styles.caption}>(Source: World Rainforests Movement)</p>
            </section>

            <section className={styles.highlightBox}>
                <p>
                    Over the past two decades, we’ve witnessed a significant unraveling.
                    Forest cover in Victoria has declined dramatically—about <strong>25%</strong> has vanished
                    between 2001 and 2020. That’s a loss of over <strong>1.5 million hectares</strong>,
                    shrinking from 6.39 million to 4.81 million hectares in just 20 years.
                </p>
            </section>

            <div className={styles.divider}></div>

            <section className={styles.contentBlock}>
                <h2>What Happens When Forests Disappear?</h2>
                <p>When forests fall, it’s not just trees we lose—it’s entire worlds.</p>
                <p>
                    Habitat loss fragments ecosystems and isolates wildlife populations. The <strong>Leadbeater’s possum</strong>,
                    for example, depends on dense canopy forests and large hollow-bearing trees, which are becoming harder to find.
                    <em> (Source: ABC)</em>
                </p>
                <p>
                    The <strong>regent honeyeater</strong>, a once-common bird, is now struggling to find the eucalyptus blossoms it needs
                    to survive—because so many of its feeding trees are gone.
                    <em> (Sources: ABC, Wikipedia)</em>
                </p>
                <p>
                    <strong>455 Native Species Threatened:</strong> Forest habitat loss in Victoria has contributed to the decline of
                    <strong> 455 native species</strong>, including <strong>212 animals</strong> and <strong>243 plants</strong> listed as
                    <strong> threatened</strong> under Victoria’s Flora and Fauna Guarantee Act.
                </p>
            </section>

            <div className={styles.divider}></div>

            <section className={styles.contentBlock}>
                <h2>Why Are Forests Disappearing?</h2>
                    <section className={styles.imageSection}>
                        <img src={forestPieImg} alt="Forest Habitat Loss Pie Chart" className={styles.img} />
                        <p className={styles.caption}><strong>Source:</strong> Global Forest Watch</p>
                    </section>
                <ul>
                    <li>
                        <strong>Logging:</strong> Commercial timber harvesting has historically led to significant habitat destruction.
                        Native forest logging is being phased out by 2030, but many habitats remain at risk.
                    </li>
                    <li>
                        <strong>Bushfires:</strong> The 2025 fire season was particularly devastating, burning 320,434 hectares—
                        worsening the damage of the 2019–2020 Black Summer fires. <em>(Source: heraldsun)</em>
                    </li>
                    <li>
                        <strong>Land Clearing:</strong> Agricultural expansion and urban development further fragment habitats,
                        threatening species survival.
                    </li>
                </ul>
                <p>
                    Addressing these challenges requires comprehensive conservation strategies,
                    sustainable land management practices, and active community engagement to preserve Victoria's ecosystems.
                </p>
            </section>
        </main>
    );
};

export default ReadMoreForest;

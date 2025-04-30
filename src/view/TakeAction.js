import React, { useState } from 'react';
import styles from './TakeAction.module.css';
import banner from '../assets/take-action.jpg';
import Quiz from './Quiz';

const TakeAction = () => {
  const [openIndex, setOpenIndex] = useState(5);
  const [quizStarted, setQuizStarted] = useState(false);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    { title: 'Flora and Fauna Guarantee Act 1988 (FFG Act)', 
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong>  This law protects Victoria’s threatened species and their habitats. It requires the government and public bodies to act in ways that conserve biodiversity.</p>
          <p>🌿 <strong>Why it matters:</strong>  It makes it illegal to harm listed species and lets people challenge harmful developments.</p>
          <p>📄 <strong>Status:</strong> In Effect</p>
        </div>
      ),
    },
    { title: 'Biodiversity 2037 Strategy', 
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong>  This strategy is Victoria’s long-term plan to improve the health of species and ecosystems by 2037. It sets goals for stopping biodiversity decline and tracking progress with data.</p>
          <p>🌿 <strong>Why it matters:</strong>  It guides investment in habitat protection and shows if policies are actually working.</p>
          <p>📄 <strong>Status:</strong> Progress tracked annually</p>
        </div>
      ),
    },
    { title: 'Planning and Environment Act 1987', 
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong> This act controls how land is used and developed. It requires permits for clearing native vegetation unless exempt.</p>
          <p>🌿 <strong>Why it matters:</strong> Local councils use this law to approve or reject forest-clearing projects.</p>
          <p>📄 <strong>Status:</strong> In Use — Councils apply this daily</p>
        </div>
      ),
    },
    { title: 'Victorian Forest Plan (2024 Logging Ban)', 
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong> Victoria has committed to ending all native forest logging on public land by 2024. This plan supports workers transitioning out of the logging industry.</p>
          <p>🌿 <strong>Why it matters:</strong>   It permanently protects millions of trees and reduces emissions from logging.</p>
          <p>📄 <strong>Status:</strong> Logging officially ended Jan 2024</p>
        </div>
      ),
    },
    { 
      title: 'Environment Effects Act 1978', 
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong> Big projects that might harm the environment (like large-scale logging or road development) need an Environment Effects Statement (EES).</p>
          <p>🌿 <strong>Why it matters:</strong>  This gives the public a chance to review and oppose harmful developments.</p>
          <p>📄 <strong>Status:</strong> Required for major proposals</p>
        </div>
      ),
    },
    {
      title: 'Regional Forest Agreements (RFAs)',
      content: (
        <div>
          <p>📄 <strong>What it is about:</strong> RFAs are long-term deals between Victoria and the federal government on how forests are used. They balance conservation with industries like timber.</p>
          <p>🌿 <strong>Why it matters:</strong> They've shaped how forests were logged and conserved for decades.</p>
          <p>📄 <strong>Status:</strong> Being reviewed post-logging phase-out</p>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <h1>
            Clear Policies. Stronger Voice. <br />
            Start Advocating for Forests Today.
          </h1>
          <p>
            Explore Victoria’s forest protection laws in simple terms, test your understanding,
            and use real policy snippets to support your cause. Start learning here.
          </p>
        </div>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>🌿 Why Policies Are the Way to Go</h2>
        <div className={styles.card}>
          <p>Recycling and reducing waste are great — but they’re not enough to protect forests.</p>
          <p>Policies are the rules that shape what governments, councils, and industries can do. They control how much forest gets cleared, how species are protected, and who’s held accountable.</p>
          <p>When you understand these policies, you can use them to speak up — and your voice becomes harder to ignore.</p>
          <p>One strong email, backed by the right policy snippet, can protect more habitat than months of everyday eco-habits.</p>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Things You Can Learn</h2>
        <div className={styles.card}>
          <p> Forest policy doesn’t have to be complicated. Here’s how this section can help you:</p>
          <ul>
            <li>📘 Understand key Victorian forest protection policies</li>
            <li>📊 See how effective these policies are through real outcomes</li>
            <li>🛠 Learn about your rights and responsibilities under these laws</li>
            <li>🧠 Get clear on complex terms with an interactive glossary</li>
            <li>📩 Use ready-made policy snippets in emails or posts</li>
          </ul>
          <p>Every bit of knowledge helps you make more powerful arguments.</p>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Get Informed</h2>
        <div className={styles.accordionWrapper}>
          {accordionData.map((item, index) => (
            <div key={index} className={styles.accordionItem} onClick={() => toggleAccordion(index)}>
              <div>{item.title}</div>
              <div className={styles.accordionIcon}>{openIndex === index ? '−' : '+'}</div>
              {openIndex === index && item.content && (
                <div className={styles.accordionContent}>{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Test Your Knowledge</h2>
        <div className={styles.card}>
          {quizStarted ? (
            <Quiz onQuit={() => setQuizStarted(false)}/>
          ) : (
            <>
              <p>Ready to check what you’ve learned about forest protection policies? Take a short quiz to reinforce your understanding and get helpful feedback.</p>
              <div className={styles.buttonGroup}>
                <button className={styles.actionButton} onClick={() => setQuizStarted(true)}>Start Quiz</button>
                <button className={styles.actionButton}>Raise your voice</button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TakeAction;
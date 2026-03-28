import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Who can participate in AVATAR'26?", a: "AVATAR'26 is open to all students from any college. Both technical and non-technical students can find events suited to their interests." },
    { q: "Is there any registration fee?", a: "Registration fees vary depending on the event. General entry may be free, but specific competitions may have nominal fees. Check event details for specifics." },
    { q: "How do I register for events?", a: "You can register right here on the website by clicking the 'Register Now' button and filling out the required form for your selected event." },
    { q: "Is accommodation provided for external participants?", a: "Yes, limited accommodation is available on a first-come, first-served basis for participants from outside Banda. Please contact the hospitality team." },
    { q: "Can I participate in multiple events?", a: "Absolutely! Just ensure that the timings of your chosen events don't clash by checking the official schedule." },
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="section-title font-squid" style={{textAlign:'center', marginBottom: '50px'}}>
          RULES <span style={{color: 'var(--teal)'}}>OF</span> ENGAGEMENT
        </h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${openIndex === index ? 'active' : ''}`} key={index}>
              <button className="faq-question" onClick={() => toggleOpen(index)}>
                <div className="faq-q-text font-orbitron">
                  <span className="faq-num font-squid">{(index + 1).toString().padStart(2, '0')}</span>
                  {faq.q}
                </div>
                <div className="faq-icon">
                  <div className="line h-line"></div>
                  <div className="line v-line"></div>
                </div>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../config/siteContent';

export const FaqAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="section section-alt" id="faqs" aria-labelledby="faqs-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Got Questions?</span>
          <h2 id="faqs-heading" className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know about starting clear-aligner treatment with Alignaa.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div key={item.id} className="faq-item">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={20} className="faq-icon-chevron" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className="faq-answer-panel"
                  style={{ display: isOpen ? 'block' : 'none' }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


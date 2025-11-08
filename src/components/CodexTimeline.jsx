import React from 'react';

function CodexTimeline({ fragments }) {
  return (
    <section className="codex-timeline">
      <h2>🧭 Codex Timeline</h2>
      {fragments.map(frag => (
        <div key={frag.id} className={`timeline-node risk-${frag.collapseRisk}`}>
          <span style={{ marginRight: 8 }}>
            {new Date(parseInt(frag.id.split('-')[1])).toLocaleTimeString()}
          </span>
          <strong>{frag.text}</strong>
        </div>
      ))}
    </section>
  );
}
export default CodexTimeline;
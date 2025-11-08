import React from 'react';

function RitualCounter({ count, setCount }) {
  return (
    <section className="counter-card">
      <button
        className="count-button"
        onClick={() => setCount(count + 1)}
        aria-label="Increment ritual count"
      >
        Ritual Count: {count}
      </button>
    </section>
  );
}
export default RitualCounter;
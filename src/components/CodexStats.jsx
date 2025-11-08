import React from 'react';
import SigilBadge from './sigilBadge';


const SIGIL_LORE = {
  fire: '🔥 Fire: Transformation, passion, destruction.',
  water: '💧 Water: Flow, emotion, intuition.',
  air: '🌬 Air: Thought, movement, clarity.',
  earth: '🌍 Earth: Stability, grounding, growth.',
  echo: '🪞 Echo: Memory, reflection, recursion.',
  spiral: '🌀 Spiral: Infinity, evolution, recursion.',
};
const SIGIL_DEFAULT_THEME = { color: '#646cff', glow: 6 };

function CodexStats({ fragments, sigilThemes }) {
  const getSigilFrequency = (frags) => {
    const freq = {};
    frags.forEach(f => Array.isArray(f.sigils) && f.sigils.forEach(s => {
      const key = s.toLowerCase();
      freq[key] = (freq[key] || 0) + 1;
    }));
    return freq;
  };
  const getRiskStats = (frags) => {
    const total = frags.length || 1;
    const soft = frags.filter(f => f.collapseRisk === 'soft').length;
    const hard = frags.filter(f => f.collapseRisk === 'hard').length;
    const terminal = frags.filter(f => f.collapseRisk === 'terminal').length;
    return { total, soft, hard, terminal };
  };
  const sigilFreq = getSigilFrequency(fragments);
  const riskStats = getRiskStats(fragments);

  return (
    <section className="codex-stats">
      <h2>📊 Codex Stats</h2>
      <ul>
        <li>Total Fragments: {riskStats.total}</li>
        <li>Soft Risk: {riskStats.soft}</li>
        <li>Hard Risk: {riskStats.hard}</li>
        <li>Terminal Risk: {riskStats.terminal}</li>
      </ul>
      <div>
        <strong>Sigil Frequencies:</strong>
        {Object.keys(sigilFreq).map(s => (
          <SigilBadge
            key={s}
            sigil={s}
            theme={sigilThemes[s] || SIGIL_DEFAULT_THEME}
            lore={SIGIL_LORE[s] || ''}
          />
        ))}
      </div>
    </section>
  );
}
export default CodexStats;
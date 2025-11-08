import React from 'react';

function SigilThemeEditor({
  sigilThemes,
  setSigilThemes,
  selectedSigil,
  setSelectedSigil,
  theme,
  setTheme,
  fragments
}) {
  const getSigilFrequency = (frags) => {
    const freq = {};
    frags.forEach(f => Array.isArray(f.sigils) && f.sigils.forEach(s => {
      const key = s.toLowerCase();
      freq[key] = (freq[key] || 0) + 1;
    }));
    return freq;
  };
  const sigilFreq = getSigilFrequency(fragments);

  const handleThemeSelect = (e) => {
    const sigil = e.target.value;
    setSelectedSigil(sigil);
    setTheme(sigilThemes[sigil] || { color: '#646cff', glow: 6 });
  };

  const handleThemeChange = (field, value) => {
    setTheme({ ...theme, [field]: value });
  };

  const handleThemeSave = () => {
    const updated = { ...sigilThemes, [selectedSigil]: theme };
    setSigilThemes(updated);
    localStorage.setItem('sigilThemes', JSON.stringify(updated));
    alert(`Theme saved for ${selectedSigil}`);
  };

  return (
    <section className="sigil-theme-editor">
      <h2>🎨 Sigil Theme Editor</h2>
      <select value={selectedSigil} onChange={handleThemeSelect}>
        <option value="">Select a sigil</option>
        {Object.keys(sigilFreq).map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      {selectedSigil && (
        <>
          <label>Color</label>
          <input
            type="color"
            value={theme.color}
            onChange={e => handleThemeChange('color', e.target.value)}
          />
          <label>Glow</label>
          <input
            type="range"
            min="0"
            max="20"
            value={theme.glow}
            onChange={e => handleThemeChange('glow', parseInt(e.target.value))}
          />
          <button onClick={handleThemeSave}>
            Save Theme
          </button>
          <div
            className="sigil-preview"
            style={{
              backgroundColor: theme.color,
              boxShadow: `0 0 ${theme.glow}px ${theme.color}`,
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              marginTop: '1rem',
              color: '#fff',
              display: 'inline-block'
            }}
          >
            {selectedSigil}
          </div>
        </>
      )}
    </section>
  );
}
export default SigilThemeEditor;
import React, { useState, useEffect } from 'react';
import { SIGIL_LORE, SIGIL_DEFAULT_THEME } from './sigilConfig';
import SigilBadge from './SigilBadge';

export default function FragmentEditor({ onSubmit, fragments = [], sigilThemes = {} }) {
  const [text, setText] = useState('');
  const [sigils, setSigils] = useState('');
  const [collapseRisk, setCollapseRisk] = useState('soft');
  const [breathline, setBreathline] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const parsedSigils = sigils
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  const validate = ({ text }) => {
    const errs = {};
    if (!text.trim()) errs.text = 'Fragment text is required.';
    if (parsedSigils.length === 0) errs.sigils = 'At least one sigil is required.';
    return errs;
  };

  useEffect(() => {
    setErrors(validate({ text }));
  }, [text, sigils]);

  const handleBlur = e => setTouched(prev => ({ ...prev, [e.target.id]: true }));
  const touchAll = () => setTouched({ text: true, sigils: true });

  const handleSubmit = e => {
    e.preventDefault();
    const fieldErrors = validate({ text });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      touchAll();
      return;
    }
    const fragment = {
      id: `frag-${Date.now()}`,
      text,
      sigils: parsedSigils,
      collapseRisk,
      breathline,
    };
    onSubmit(fragment);
    setText('');
    setSigils('');
    setCollapseRisk('soft');
    setBreathline('');
    setTouched({});
    setErrors({});
  };

  const handleExport = () => {
    const codex = JSON.stringify(fragments, null, 2);
    navigator.clipboard.writeText(codex);
    alert('Codex copied to clipboard!');
  };

  const isValid = text.trim() && parsedSigils.length > 0;

  return (
    <div className="fragment-editor">
      <h2>🜁 Fragment Editor</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Fragment Text */}
        <div>
          <label htmlFor="text">Fragment Text:</label>
          <textarea
            id="text"
            placeholder="Enter fragment text..."
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.text}
            aria-describedby={errors.text ? 'text-error' : undefined}
          />
          {touched.text && errors.text && (
            <div className="error-message" id="text-error">{errors.text}</div>
          )}
        </div>

        {/* Sigils */}
        <div>
          <label htmlFor="sigils">Sigils (comma-separated):</label>
          <input
            id="sigils"
            type="text"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="e.g. fire, water, earth"
            value={sigils}
            onChange={e => setSigils(e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.sigils}
            aria-describedby={errors.sigils ? 'sigils-error' : undefined}
            style={{ textTransform: 'lowercase' }}
          />
          {touched.sigils && errors.sigils && (
            <div className="error-message" id="sigils-error">{errors.sigils}</div>
          )}
          {parsedSigils.length > 0 && (
            <div className="live-preview">
              <small>Live preview:</small>
              <ul style={{ listStyle: 'none', marginLeft: 0, paddingLeft: 0 }}>
                {parsedSigils.map((s, idx) => (
                  <li key={idx} style={{ display: 'inline', marginRight: '0.25rem' }}>
                    <SigilBadge
                      sigil={s}
                      theme={sigilThemes[s] || SIGIL_DEFAULT_THEME}
                      lore={SIGIL_LORE[s]}
                      onClick={() => window.open(`https://en.wikipedia.org/wiki/${s}`, '_blank')}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Collapse Risk */}
        <div>
          <label htmlFor="collapseRisk">Collapse Risk:</label>
          <select
            id="collapseRisk"
            value={collapseRisk}
            onChange={e => setCollapseRisk(e.target.value)}
            className={`risk-${collapseRisk}`}
            style={{
              borderLeft: `6px solid ${
                collapseRisk === 'terminal'
                  ? '#cf4646'
                  : collapseRisk === 'hard'
                  ? '#ffd859'
                  : '#5cf7b2'
              }`,
            }}
          >
            <option value="soft">Soft</option>
            <option value="hard">Hard</option>
            <option value="terminal">Terminal</option>
          </select>
        </div>

        {/* Breathline */}
        <div>
          <label htmlFor="breathline">Breathline:</label>
          <input
            id="breathline"
            type="text"
            placeholder="Enter breathline..."
            value={breathline}
            onChange={e => setBreathline(e.target.value)}
          />
          {breathline && (
            <div className="breathline-visual">
              <small>Breathline:</small>
              <div className="breathline-box">{breathline}</div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            marginTop: '1.1rem',
            padding: '0.55rem 1.4rem',
            fontWeight: 'bold',
            background: isValid ? '#646cff' : '#888',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: isValid ? 'pointer' : 'not-allowed',
            letterSpacing: '0.06em',
            boxShadow: isValid ? '0 0 4px #646cff77' : 'none',
            transition: 'background 0.18s',
          }}
        >
          Seal Fragment
        </button>
      </form>

      <button
        onClick={handleExport}
        className="export-button"
        style={{
          margin: '1.25rem 0 0 0',
          padding: '0.3rem 1.2rem',
          background: '#23234d',
          color: '#91e3f6',
          borderRadius: '6px',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        📜 Copy Codex
      </button>
    </div>
  );
}

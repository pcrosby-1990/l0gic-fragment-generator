import React, { useState } from 'react';
import SigilBadge from '../SigilBadge';
import { SIGIL_DEFAULT_THEME } from '../sigilConfig';

export default function EditorPanel({ onSubmit, fragments = [], sigilThemes = {}, SIGIL_LORE = {}, SIGIL_DEFAULT_THEME = SIGIL_DEFAULT_THEME }) {
  const [text, setText] = useState('');
  const [sigils, setSigils] = useState('');
  const [collapseRisk, setCollapseRisk] = useState('soft');
  const [breathline, setBreathline] = useState('');
  const [witness, setWitness] = useState('patrick-crosby 🜎');
  const [errors, setErrors] = useState({});

  const parsedSigils = sigils.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  const validate = () => {
    const errs = {};
    if (!text.trim()) errs.text = 'Fragment text is required.';
    if (parsedSigils.length === 0) errs.sigils = 'At least one sigil is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    onSubmit({ text, sigils: parsedSigils, collapseRisk, breathline, witness });
    setText('');
    setSigils('');
    setCollapseRisk('soft');
    setBreathline('');
    setWitness('patrick-crosby 🜎');
    setErrors({});
  };

  return (
    <div className="editor-panel">
      <form onSubmit={handleSubmit} noValidate>
        <label>Fragment Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
        {errors.text && <div className="error">{errors.text}</div>}

        <label>Sigils (comma-separated)</label>
        <input value={sigils} onChange={(e) => setSigils(e.target.value)} />
        {errors.sigils && <div className="error">{errors.sigils}</div>}
        <div className="sigil-preview">
          {parsedSigils.map(s => <span key={s}><SigilBadge sigil={s} theme={sigilThemes[s] || SIGIL_DEFAULT_THEME} lore={SIGIL_LORE[s]} /></span>)}
        </div>

        <div className="row">
          <div>
            <label>Collapse Risk</label>
            <select value={collapseRisk} onChange={e => setCollapseRisk(e.target.value)}>
              <option value="soft">Soft</option>
              <option value="hard">Hard</option>
              <option value="terminal">Terminal</option>
            </select>
          </div>
          <div>
            <label>Breathline</label>
            <input value={breathline} onChange={e => setBreathline(e.target.value)} />
          </div>
        </div>

        <label>Witness</label>
        <input value={witness} onChange={e => setWitness(e.target.value)} />

        <div className="row actions">
          <button className="btn primary" type="submit" disabled={!text.trim() || parsedSigils.length === 0}>Seal Fragment</button>
          <button type="button" className="btn" onClick={() => { setText(''); setSigils(''); }}>Clear</button>
          <div className="meta-preview">{fragments.length} fragments</div>
        </div>
      </form>
    </div>
  );
}
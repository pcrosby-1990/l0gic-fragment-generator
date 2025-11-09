import React from 'react';
import SigilBadge from '../SigilBadge';
import { SIGIL_DEFAULT_THEME } from '../sigilConfig';

const FragmentRow = React.memo(function FragmentRow({ fragment, onEdit, onDelete, onToggleReveal }) {
  const { id, text, sigils, collapseRisk, breathline, timestamp, witness, revisionHistory, echoStatus } = fragment;
  const riskColor = collapseRisk === 'terminal' ? '#cf4646' : collapseRisk === 'hard' ? '#ffd859' : '#5cf7b2';
  return (
    <div className="fragment-row">
      <div className="row-left">
        <div className="echo-icon">{echoStatus === 'sealed' ? '🔒' : echoStatus === 'echoing' ? '📣' : '✳️'}</div>
        <div className="risk-dot" style={{ background: riskColor }} title={`Collapse risk: ${collapseRisk}`} />
      </div>

      <div className="row-main">
        <div className="meta">
          <strong>{witness}</strong>
          <span className="meta-time">— {new Date(timestamp).toLocaleString()}</span>
        </div>

        <div className="fragment-text">{text}</div>

        {breathline && <div className="breathline">Breathline: <span className="breathline-chip">{breathline}</span></div>}

        <div className="sigils">  
          {sigils.map((s, i) => <span key={s + i}><SigilBadge sigil={s} theme={SIGIL_DEFAULT_THEME} /></span>)}
        </div>
      </div>

      <div className="row-actions">
        <button className="btn" onClick={() => onEdit(fragment)}>✍️ Edit</button>
        <button className="btn" onClick={() => onToggleReveal(id)}>🔍 Revisions ({revisionHistory.length})</button>
        <button className="btn danger" onClick={() => onDelete(id)}>🗑️</button>
      </div>
    </div>
  );
});

export default FragmentRow;
import React, { useRef, useState } from 'react';
import FragmentRow from './FragmentRow';

// Simple virtualization: render a slice of the list based on scroll
export default function FragmentList({ fragments = [], mirrorMode = false, onDelete, onEdit, onToggleReveal, revealMap = {} }) {
  const listRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 520;
  const rowHeight = 140;
  const buffer = 4;

  const onScroll = (e) => setScrollTop(e.currentTarget.scrollTop);

  const total = fragments.length;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const endIndex = Math.min(total - 1, Math.floor((scrollTop + containerHeight) / rowHeight) + buffer);
  const topPadding = Math.max(0, startIndex * rowHeight);
  const bottomPadding = Math.max(0, (total - endIndex - 1) * rowHeight);
  const visible = fragments.slice(startIndex, endIndex + 1);

  return (
    <div ref={listRef} onScroll={onScroll} style={{ height: containerHeight, overflow: 'auto', borderRadius: 8 }} className="fragment-list">
      <div style={{ height: topPadding }} />
      {mirrorMode ? (
        visible.map(f => <pre key={f.id} className="mirror-json">{JSON.stringify(f, null, 2)}</pre>)
      ) : (
        visible.map(f => (
          <div key={f.id}>
            <FragmentRow fragment={f} onEdit={onEdit} onDelete={onDelete} onToggleReveal={onToggleReveal} />
            {revealMap[f.id] && (
              <details open className="revision-details">
                <summary>🜎 Past Echoes ({(f.revisionHistory || []).length})</summary>
                <div className="revisions">
                  {(f.revisionHistory || []).slice().reverse().map((rev, idx) => (
                    <div key={idx} className="revision-item">
                      <div className="rev-meta">{new Date(rev.timestamp).toLocaleString()} — {rev.witness}</div>
                      <div className="rev-text">{rev.text}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))
      )}
      <div style={{ height: bottomPadding }} />
      {total === 0 && <div className="empty">No fragments — create one above.</div>}  
    </div>
  );
}
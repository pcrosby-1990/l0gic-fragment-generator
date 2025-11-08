import React, { useMemo } from 'react';
import SigilBadge from './SigilBadge';

import { SIGIL_LORE, SIGIL_DEFAULT_THEME } from './sigilConfig';

function SealedFragments({
  fragments,
  sigilThemes,
  sortBy,
  setSortBy,
  filterSigil,
  setFilterSigil,
}) {
  const getSigilFrequency = fragments => {
    const freq = {};
    fragments.forEach(frag => {
      if (Array.isArray(frag.sigils)) {
        frag.sigils.forEach(sigil => {
          const key = sigil.toLowerCase();
          freq[key] = (freq[key] || 0) + 1;
        });
      }
    });
    return freq;
  };

  const sigilFreq = useMemo(() => getSigilFrequency(fragments), [fragments]);

  const filteredFragments = useMemo(() => {
    return fragments
      .filter(frag => {
        if (!filterSigil) return true;
        return (
          Array.isArray(frag.sigils) &&
          frag.sigils.map(s => s.toLowerCase()).includes(filterSigil.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortBy === 'risk') return a.collapseRisk.localeCompare(b.collapseRisk);
        return b.id.localeCompare(a.id);
      });
  }, [fragments, filterSigil, sortBy]);

  return (
    <section className="sealed-fragments">
      <h2>🔐 Sealed Fragments</h2>
      <div style={{ margin: '0.7em 0' }}>
        <label>
          Filter by Sigil:&nbsp;
          <select value={filterSigil} onChange={e => setFilterSigil(e.target.value)}>
            <option value="">— All —</option>
            {Object.keys(sigilFreq).map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '1em' }}>
          Sort:&nbsp;
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="risk">Collapse Risk</option>
          </select>
        </label>
      </div>

      {filteredFragments.length === 0 ? (
        <p>No fragments sealed yet.</p>
      ) : (
        <div className="fragments-list">
          {filteredFragments.map(frag => (
            <div key={frag.id} className="fragment-card">
              <div>
                <strong>Text:</strong> {frag.text || '—'}
              </div>
              <div>
                <strong>Sigils:</strong>&nbsp;
                {Array.isArray(frag.sigils) && frag.sigils.length > 0 ? (
                  frag.sigils.map((s, idx) => (
                    <SigilBadge
                      key={idx}
                      sigil={s}
                      theme={sigilThemes[s.toLowerCase()] || SIGIL_DEFAULT_THEME}
                      lore={SIGIL_LORE[s.toLowerCase()]}
                      onClick={() =>
                        window.open(`https://en.wikipedia.org/wiki/${s}`, '_blank')
                      }
                    />
                  ))
                ) : (
                  '—'
                )}
              </div>
              <div>
                <strong>Collapse Risk:</strong> {frag.collapseRisk || '—'}
              </div>
              <div>
                <strong>Breathline:</strong> {frag.breathline || '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SealedFragments;
import React from 'react';

function SigilBadge({ sigil, theme, lore }) {
  return (
    <span
      className="sigil-badge"
      style={{
        color: theme?.color || '#646cff',
        textShadow: `0 0 ${theme?.glow || 4}px ${theme?.color || '#646cff'}`,
        marginRight: '0.5rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: '#f0f0f0',
        cursor: 'default',
      }}
      title={lore}
    >
      {sigil}
    </span>
  );
}

export default SigilBadge;

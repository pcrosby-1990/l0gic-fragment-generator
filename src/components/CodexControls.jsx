import React from 'react';

function CodexControls({ codexName, setCodexName, codexList, setCodexList, fragments, setFragments }) {
  const handleSaveCodex = () => {
    if (!codexName) return alert('Name your Codex first!');
    const updated = { ...codexList, [codexName]: fragments };
    setCodexList(updated);
    localStorage.setItem('codexList', JSON.stringify(updated));
    alert(`Codex "${codexName}" saved.`);
  };
  const handleLoadCodex = (name) => {
    const loaded = codexList[name];
    if (loaded) {
      setFragments(loaded);
      setCodexName(name);
      alert(`Codex "${name}" loaded.`);
    }
  };
  const handleShareCodex = () => {
    const encoded = encodeURIComponent(JSON.stringify(fragments));
    const link = `${window.location.origin}?codex=${encoded}`;
    navigator.clipboard.writeText(link);
    alert('Shareable link copied to clipboard!');
  };
  const handleExport = () => {
    const codex = JSON.stringify(fragments, null, 2);
    navigator.clipboard.writeText(codex);
    alert('Codex copied to clipboard!');
  };
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(fragments, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'spiral-codex.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="codex-controls">
      <h2>🗂 Codex Management</h2>
      <input
        type="text"
        placeholder="Name this Codex..."
        value={codexName}
        onChange={e => setCodexName(e.target.value)}
      />
      <div className="codex-controls-buttons">
        <button onClick={handleSaveCodex}>💾 Save Codex</button>
        <button onClick={handleShareCodex}>🌐 Share Codex</button>
        <button onClick={handleExport}>📋 Copy Codex</button>
        <button onClick={handleDownload}>⬇️ Download Codex</button>
      </div>
      <h3>📂 Load Saved Codex</h3>
      <ul>
        {Object.keys(codexList).map(name => (
          <li key={name}>
            <button onClick={() => handleLoadCodex(name)}>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default CodexControls;
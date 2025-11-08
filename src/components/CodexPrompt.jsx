import React from 'react';

function CodexPrompt({ prompt, setPrompt, onGenerateFragment }) {
  const extractSigils = (text) => {
    const keywords = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const unique = [...new Set(keywords)];
    return unique.slice(0, 3);
  };
  const handlePromptGenerate = () => {
    const sigils = extractSigils(prompt);
    const fragment = {
      id: `frag-${Date.now()}`,
      text: prompt,
      sigils,
      collapseRisk: 'hard',
      breathline: prompt.split(' ').slice(0, 2).join('-'),
    };
    onGenerateFragment(fragment);
    setPrompt('');
  };

  return (
    <section className="codex-prompt">
      <h2>🪄 Add Fragment via Prompt</h2>
      <input
        type="text"
        placeholder="Describe a new ritual fragment..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button disabled={!prompt.trim()} onClick={handlePromptGenerate}>Generate Fragment</button>
    </section>
  );
}
export default CodexPrompt;
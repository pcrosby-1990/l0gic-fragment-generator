import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import FragmentEditor from './components/FragmentEditor.jsx';
import CodexControls from './components/CodexControls.jsx';
import CodexPrompt from './components/CodexPrompt.jsx';
import SigilThemeEditor from './components/SigilThemeEditor.jsx';
import SpiralSuggestion from './components/SpiralSuggestion.jsx';
import CodexTimeline from './components/CodexTimeline.jsx';
import SealedFragments from './components/SealedFragments.jsx';
import CodexStats from './components/CodexStats.jsx';
import RitualCounter from './components/RitualCounter.jsx';

import { SIGIL_DEFAULT_THEME } from './components/sigilConfig.js';

function App() {
  const [count, setCount] = useState(0);
  const [fragments, setFragments] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterSigil, setFilterSigil] = useState('');
  const [prompt, setPrompt] = useState('');
  const [codexName, setCodexName] = useState('');
  const [codexList, setCodexList] = useState(() => {
    try {
      const saved = localStorage.getItem('codexList');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [sigilThemes, setSigilThemes] = useState(() => {
    try {
      const saved = localStorage.getItem('sigilThemes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [selectedSigil, setSelectedSigil] = useState('');
  const [theme, setTheme] = useState(SIGIL_DEFAULT_THEME);

  const handleFragmentSubmit = (fragment) => setFragments(prev => [...prev, fragment]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('codex');
    if (shared) {
      try {
        const decoded = JSON.parse(decodeURIComponent(shared));
        setFragments(decoded);
        setCodexName('Shared Codex');
      } catch (e) {
        console.error('Invalid Shared Codex');
      }
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-row">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo vite-logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react-logo" alt="React logo" />
          </a>
        </div>
        <h1>Spiral Codex Ritual Engine</h1>
      </header>
      <main>
        <FragmentEditor
          onSubmit={handleFragmentSubmit}
          fragments={fragments}
          sigilThemes={sigilThemes}
        />
        <CodexControls
          codexName={codexName}
          setCodexName={setCodexName}
          codexList={codexList}
          setCodexList={setCodexList}
          fragments={fragments}
          setFragments={setFragments}
        />
        <CodexPrompt
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerateFragment={handleFragmentSubmit}
        />
        <SigilThemeEditor
          sigilThemes={sigilThemes}
          setSigilThemes={setSigilThemes}
          selectedSigil={selectedSigil}
          setSelectedSigil={setSelectedSigil}
          theme={theme}
          setTheme={setTheme}
          fragments={fragments}
        />
        <SpiralSuggestion fragments={fragments} />
        <CodexTimeline fragments={fragments} />
        <SealedFragments
          fragments={fragments}
          sigilThemes={sigilThemes}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterSigil={filterSigil}
          setFilterSigil={setFilterSigil}
        />
        <CodexStats fragments={fragments} sigilThemes={sigilThemes} />
        <RitualCounter count={count} setCount={setCount} />
      </main>
      <footer className="app-footer">
        <p className="read-the-docs">
          Spiral Codex ritual engine by{' '}
          <a href="https://github.com/pcrosby-1990" target="_blank" rel="noreferrer">
            pcrosby-1990
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
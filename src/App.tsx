import React, { useState, useEffect } from 'react';
import FragmentEditor from './FragmentEditor';
import { sigilLore } from './sigilLore';
import { sigilThemes } from './sigilThemes'; // if you have one
const App: React.FC = () => {
  const [fragments, setFragments] = useState<FragmentType[]>([]);

  const handleFragmentSubmit = (fragment: FragmentType) => {
    setFragments(prev => [...prev, fragment]);
  };

  return (
    <div className="app-container">
      <h1>🌀 Spiral Codex</h1>
      <FragmentEditor
        onSubmit={handleFragmentSubmit}
        fragments={fragments}
        sigilThemes={sigilThemes}
      />
      {/* Render fragments here if needed */}
    </div>
  );
};

export default App;
type FragmentType = {
  id: string;
  text: string;
  sigils: string[];
  collapseRisk: string;
  breathline: string;
};

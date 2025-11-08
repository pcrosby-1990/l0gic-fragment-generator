import { extractSigils, getSigilFrequency, getRiskStats } from './utils';

describe('extractSigils', () => {
  it('should extract up to three unique 4+ letter keywords', () => {
    expect(extractSigils('fire water earth')).toEqual(['fire', 'water', 'earth']);
    expect(extractSigils('Fire, Water, Fire')).toEqual(['fire', 'water']);
    expect(extractSigils('deep spiral recursion echo mirror')).toEqual(['deep', 'spiral', 'recursion']);
    expect(extractSigils('')).toEqual([]);
    expect(extractSigils('up to three only please')).toEqual(['three', 'only', 'please']);
  });
});

describe('getSigilFrequency', () => {
  it('should count sigil frequency case-insensitively', () => {
    const fragments = [
      { sigils: ['Fire', 'Water'] },
      { sigils: ['fire', 'Echo'] },
      { sigils: ['echo', 'water'] },
    ];
    expect(getSigilFrequency(fragments)).toEqual({ fire: 2, water: 2, echo: 2 });
    expect(getSigilFrequency([])).toEqual({});
  });
});

describe('getRiskStats', () => {
  it('should count collapse risks correctly', () => {
    const fragments = [
      { collapseRisk: 'soft' },
      { collapseRisk: 'hard' },
      { collapseRisk: 'terminal' },
      { collapseRisk: 'hard' },
    ];
    expect(getRiskStats(fragments)).toEqual({
      total: 4,
      soft: 1,
      hard: 2,
      terminal: 1,
    });
    expect(getRiskStats([])).toEqual({
      total: 1,
      soft: 0,
      hard: 0,
      terminal: 0,
    });
  });
});
import { useState, useCallback } from 'react';
import { useFilteredData } from './hooks/useFilteredData';
import GlobeView from './components/GlobeView';
import TimelineSlider from './components/TimelineSlider';
import CountryCard from './components/CountryCard';
import ComparisonPanel from './components/ComparisonPanel';
import EraLegend from './components/EraLegend';

export default function App() {
  const [selectedEra, setSelectedEra]         = useState('Industry 3.0');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [compareList, setCompareList]         = useState([]);
  const [showLayer2, setShowLayer2]           = useState(false);

  const { filteredData, markers, arcs } = useFilteredData(selectedEra, showLayer2);

  const handleCountryClick = useCallback((point) => {
    const country = filteredData.find(c => c.country === point.country);
    if (country) setSelectedCountry(country);
  }, [filteredData])

  function handleCompare(country) {
    setCompareList(prev => {
      const exists = prev.find(c => c.country === country.country);
      if (exists) return prev.filter(c => c.country !== country.country);
      if (prev.length >= 4) return prev;
      return [...prev, country];
    });
  }

  const isComparing = compareList.some(c => c.country === selectedCountry?.country);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#020408',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Syne, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '20px 28px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: 'linear-gradient(to bottom, rgba(2,4,8,0.9) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <div>
          <div style={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00d4ff',
            letterSpacing: '0.2em',
            marginBottom: 4,
            opacity: 0.8,
          }}>
            SPATIO-TEMPORAL VISUALIZATION SYSTEM
          </div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            AI Evolution
            <span style={{ color: '#00d4ff' }}> Dashboard</span>
          </h1>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 5,
          }}>
            Industry 1.0 → 4.0 · {filteredData.length} countries · {selectedEra}
          </div>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.2)',
          textAlign: 'right',
          lineHeight: 1.8,
        }}>
          <div>Click marker to explore</div>
          <div>Drag to rotate · Scroll to zoom</div>
        </div>
      </div>

      {/* Globe */}
      <GlobeView
        markers={markers}
        arcs={arcs}
        onCountryClick={handleCountryClick}
        selectedEra={selectedEra}
      />

      {/* Panels */}
      {compareList.length > 0 && (
        <ComparisonPanel
          countries={compareList}
          onRemove={name => setCompareList(prev => prev.filter(c => c.country !== name))}
          onClear={() => setCompareList([])}
        />
      )}

      {selectedCountry && (
        <CountryCard
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onCompare={handleCompare}
          isComparing={isComparing}
        />
      )}

      <EraLegend
        showLayer2={showLayer2}
        onToggleLayer2={() => setShowLayer2(p => !p)}
      />

      <TimelineSlider
        selectedEra={selectedEra}
        onChange={setSelectedEra}
      />
    </div>
  );
}
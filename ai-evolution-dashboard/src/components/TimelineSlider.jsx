import { useState, useEffect } from 'react';
import { ERA_COLORS } from '../utils/globeMarkers';

const ERAS = ['Industry 1.0', 'Industry 2.0', 'Industry 3.0', 'Industry 4.0'];
const ERA_YEARS = {
  'Industry 1.0': '1760–1840',
  'Industry 2.0': '1870–1940',
  'Industry 3.0': '1950–1990',
  'Industry 4.0': '2000–present',
};
const ERA_SUBTITLES = {
  'Industry 1.0': 'Steam & Mechanical Power',
  'Industry 2.0': 'Electricity & Mass Production',
  'Industry 3.0': 'Computing & Automation',
  'Industry 4.0': 'AI, Data & Cyber-Physical Systems',
};

export default function TimelineSlider({ selectedEra, onChange }) {
  const idx = ERAS.indexOf(selectedEra);

  return (
    <div style={{
      position: 'absolute',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(720px, 90vw)',
      background: 'rgba(2,4,8,0.88)',
      border: '1px solid rgba(0,212,255,0.18)',
      borderRadius: 16,
      padding: '20px 28px 16px',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
    }}>
      {/* Era label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
        <div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: ERA_COLORS[selectedEra],
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            {selectedEra}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 4,
            letterSpacing: '0.08em',
          }}>
            {ERA_SUBTITLES[selectedEra]}
          </div>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          color: ERA_COLORS[selectedEra],
          opacity: 0.8,
        }}>
          {ERA_YEARS[selectedEra]}
        </div>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {ERAS.map((era, i) => (
          <button
            key={era}
            onClick={() => onChange(era)}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              background: i <= idx ? ERA_COLORS[era] : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          />
        ))}
      </div>

      {/* Era buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        {ERAS.map((era, i) => (
          <button
            key={era}
            onClick={() => onChange(era)}
            style={{
              flex: 1,
              padding: '8px 4px',
              borderRadius: 8,
              border: `1px solid ${era === selectedEra ? ERA_COLORS[era] : 'rgba(255,255,255,0.08)'}`,
              background: era === selectedEra ? `${ERA_COLORS[era]}18` : 'transparent',
              color: era === selectedEra ? ERA_COLORS[era] : 'rgba(255,255,255,0.35)',
              fontFamily: 'Syne, sans-serif',
              fontSize: 11,
              fontWeight: era === selectedEra ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.02em',
            }}
          >
            {era.replace('Industry ', '')}
          </button>
        ))}
      </div>
    </div>
  );
}
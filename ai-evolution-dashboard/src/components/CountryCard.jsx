import React from 'react';
import { COLOR_MAP, NARRATIVE_LABELS } from '../utils/globeMarkers';

const IMPACT_BAR = {
  'Very Low': 1, 'Low': 1, 'Medium': 2, 'High': 3, 'Very High': 4, 'Extreme': 5
};

export default function CountryCard({ country, onClose, onCompare, isComparing }) {
  if (!country) return null;
  const { currentEra, narrative_weight, description } = country;
  if (!currentEra) return null;

  const color = COLOR_MAP[narrative_weight] || '#fff';
  const impactBars = IMPACT_BAR[currentEra.impact_level] || 1;

  return (
    <div style={{
      position: 'absolute',
      top: 24,
      right: 24,
      width: 320,
      background: 'rgba(2,4,8,0.94)',
      border: `1px solid ${color}44`,
      borderRadius: 16,
      padding: 24,
      backdropFilter: 'blur(24px)',
      zIndex: 200,
      animation: 'slideIn 0.25s ease',
    }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color,
            letterSpacing: '-0.02em',
          }}>
            {country.country}
          </div>
          <div style={{
            display: 'inline-block',
            marginTop: 4,
            padding: '2px 8px',
            borderRadius: 4,
            background: `${color}20`,
            border: `1px solid ${color}40`,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color,
            letterSpacing: '0.08em',
          }}>
            {NARRATIVE_LABELS[narrative_weight]}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer',
          borderRadius: 6,
          width: 28,
          height: 28,
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>✕</button>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.6,
        marginBottom: 16,
        borderLeft: `2px solid ${color}40`,
        paddingLeft: 10,
      }}>
        {description}
      </p>

      {/* Era info */}
      <div style={{
        background: `${color}0a`,
        border: `1px solid ${color}20`,
        borderRadius: 10,
        padding: '12px 14px',
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 13,
          fontWeight: 700,
          color,
          marginBottom: 4,
        }}>
          {currentEra.era} · {currentEra.year_range}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 10,
        }}>
          {currentEra.ai_stage}
        </div>

        {/* Impact meter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: 'rgba(255,255,255,0.35)',
            width: 54,
          }}>
            IMPACT
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{
                width: 20,
                height: 4,
                borderRadius: 2,
                background: i <= impactBars ? color : 'rgba(255,255,255,0.1)',
              }} />
            ))}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color,
            opacity: 0.7,
          }}>
            {currentEra.impact_level}
          </div>
        </div>
      </div>

      {/* Key events */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          marginBottom: 8,
        }}>
          KEY EVENTS
        </div>
        {currentEra.key_events.map((ev, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 8,
            marginBottom: 6,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: color,
              marginTop: 5,
              flexShrink: 0,
              opacity: 0.8,
            }} />
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.5,
            }}>
              {ev}
            </div>
          </div>
        ))}
      </div>

      {/* Compare button */}
      <button
        onClick={() => onCompare(country)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: 8,
          border: `1px solid ${isComparing ? color : 'rgba(255,255,255,0.12)'}`,
          background: isComparing ? `${color}22` : 'rgba(255,255,255,0.04)',
          color: isComparing ? color : 'rgba(255,255,255,0.5)',
          fontFamily: 'Syne, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.05em',
          transition: 'all 0.2s',
        }}
      >
        {isComparing ? '✓ Added to Compare' : '+ Add to Compare'}
      </button>
    </div>
  );
}
import React from 'react';
import { COLOR_MAP, NARRATIVE_LABELS } from '../utils/globeMarkers';

export default function EraLegend({ showLayer2, onToggleLayer2 }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 130,
      right: 24,
      background: 'rgba(2,4,8,0.88)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '14px 16px',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
      minWidth: 170,
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
        marginBottom: 10,
      }}>
        NARRATIVE ROLE
      </div>
      {Object.entries(COLOR_MAP).map(([key, color]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
          }} />
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
          }}>
            {NARRATIVE_LABELS[key]}
          </div>
        </div>
      ))}

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 10,
        paddingTop: 10,
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
        }}>
          <div
            onClick={onToggleLayer2}
            style={{
              width: 32,
              height: 16,
              borderRadius: 8,
              background: showLayer2 ? '#00d4ff' : 'rgba(255,255,255,0.1)',
              position: 'relative',
              transition: 'background 0.2s',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute',
              top: 2,
              left: showLayer2 ? 18 : 2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
            }} />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: showLayer2 ? '#00d4ff' : 'rgba(255,255,255,0.35)',
          }}>
            Show all countries (L2)
          </div>
        </label>
      </div>
    </div>
  );
}
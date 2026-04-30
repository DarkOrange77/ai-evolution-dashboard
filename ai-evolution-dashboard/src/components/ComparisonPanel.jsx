import { COLOR_MAP } from '../utils/globeMarkers';

const ERAS = ['Industry 1.0', 'Industry 2.0', 'Industry 3.0', 'Industry 4.0'];

export default function ComparisonPanel({ countries, onRemove, onClear }) {
  if (!countries || countries.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 24,
      left: 24,
      width: 300,
      background: 'rgba(2,4,8,0.94)',
      border: '1px solid rgba(0,212,255,0.15)',
      borderRadius: 16,
      padding: 20,
      backdropFilter: 'blur(24px)',
      zIndex: 200,
      animation: 'fadeIn 0.25s ease',
    }}>
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 13,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.06em',
        }}>
          COMPARE · IMPACT ACROSS ERAS
        </div>
        <button onClick={onClear} style={{
          background: 'none', border: 'none',
          color: 'rgba(255,255,255,0.3)',
          cursor: 'pointer', fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          clear
        </button>
      </div>

      {/* Chart */}
      <div style={{ marginBottom: 16 }}>
        {ERAS.map(era => (
          <div key={era} style={{ marginBottom: 12 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 5,
              letterSpacing: '0.06em',
            }}>
              {era.replace('Industry ', 'ERA ')}
            </div>
            <div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
              {countries.map(c => {
                const eraData = c.eras.find(e => e.era === era);
                const score = eraData?.impact_score || 0;
                const color = COLOR_MAP[c.narrative_weight] || '#fff';
                return (
                  <div key={c.country} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 60,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      color,
                      opacity: 0.8,
                      flexShrink: 0,
                    }}>
                      {c.code}
                    </div>
                    <div style={{
                      flex: 1,
                      height: 6,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${(score / 5) * 100}%`,
                        background: color,
                        borderRadius: 3,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.3)',
                      width: 14,
                    }}>
                      {score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Country tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {countries.map(c => {
          const color = COLOR_MAP[c.narrative_weight] || '#fff';
          return (
            <div key={c.country} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 8px',
              borderRadius: 6,
              background: `${color}18`,
              border: `1px solid ${color}35`,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color,
              }}>
                {c.code}
              </div>
              <button onClick={() => onRemove(c.country)} style={{
                background: 'none', border: 'none',
                color: `${color}80`, cursor: 'pointer',
                fontSize: 11, lineHeight: 1, padding: 0,
              }}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
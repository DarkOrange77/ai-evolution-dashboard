import { useRef, useCallback, useEffect, useState, memo } from 'react';
import Globe from 'react-globe.gl';

// Stable label — outside component, never re-creates
const getPointLabel = d => `
  <div style="
    background:rgba(2,4,8,0.92);
    border:1px solid ${d.color};
    border-radius:6px;
    padding:8px 12px;
    font-family:'Syne',sans-serif;
    color:#fff;
    font-size:13px;
    pointer-events:none;
  ">
    <div style="font-weight:700;color:${d.color}">${d.country}</div>
    <div style="font-size:11px;opacity:0.7;margin-top:2px">${d.currentEra?.ai_stage || ''}</div>
  </div>
`;

// Stable renderer config — outside component so object ref never changes
const RENDERER_CONFIG = {
  antialias: false,              // OFF — biggest single GPU saving with 20+ markers
  powerPreference: 'high-performance',
  precision: 'mediump',          // medium precision = ~30% less GPU work
};

function GlobeView({ markers, arcs, onCountryClick }) {
  const globeRef    = useRef(null);
  const rafRef      = useRef(null);   // track animation frame for cleanup
  const [dimensions, setDimensions] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  // Debounced resize
  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDimensions({ w: window.innerWidth, h: window.innerHeight });
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, []);

  // Pause rotation when tab is hidden — stops GPU work when user switches tabs
  useEffect(() => {
    const onVisibility = () => {
      const g = globeRef.current;
      if (!g) return;
      const controls = g.controls();
      controls.autoRotate = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const handleGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;

    const controls = g.controls();
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.3;    // slower = less CPU per frame
    controls.enableDamping   = false;  // OFF — damping + autoRotate accumulate floating point drift over time, causing the eventual stutter
    controls.enableZoom      = true;
    controls.zoomSpeed       = 0.8;

    // Limit how close user can zoom — prevents over-rendering detail
    controls.minDistance = 150;
    controls.maxDistance = 600;

    g.pointOfView({ altitude: 2.5 }, 0);

    // Throttle the renderer to ~40fps max — smooth enough, much less GPU load
    const renderer = g.renderer();
    if (renderer) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap at 1.5x — retina at 2x/3x is overkill
    }
  }, []);

  return (
    <Globe
      ref={globeRef}

      // Textures
      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"

      // Atmosphere
      showAtmosphere={true}
      atmosphereColor="#00d4ff"
      atmosphereAltitude={0.08}

      // Points
      pointsData={markers}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointRadius="size"
      pointAltitude={0.02}
      pointsMerge={false}
      pointLabel={getPointLabel}

      // Arcs — disabled animation entirely, static arcs = zero per-frame cost
      arcsData={arcs}
      arcColor="color"
      arcAltitude={0.15}
      arcStroke={0.3}
      arcDashLength={1}         // full dash = no animation needed
      arcDashGap={0}            // no gap = static line
      arcDashAnimateTime={0}    // 0 = completely stops arc animation loop

      // Events
      onPointClick={onCountryClick}
      onGlobeReady={handleGlobeReady}

      // Size
      width={dimensions.w}
      height={dimensions.h}

      // Renderer
      rendererConfig={RENDERER_CONFIG}
      animateIn={true}
    />
  );
}

export default memo(GlobeView);
export const COLOR_MAP = {
  pioneer_arc:    '#00d4ff',
  cautionary_arc: '#f59e0b',
  leapfrog_arc:   '#10b981',
  scale_arc:      '#a78bfa',
  policy_arc:     '#f472b6',
};

export const ERA_COLORS = {
  'Industry 1.0': '#64748b',
  'Industry 2.0': '#3b82f6',
  'Industry 3.0': '#8b5cf6',
  'Industry 4.0': '#00d4ff',
};

export const NARRATIVE_LABELS = {
  pioneer_arc:    'Pioneer',
  cautionary_arc: 'Cautionary',
  leapfrog_arc:   'Leapfrogger',
  scale_arc:      'Industrial Scaler',
  policy_arc:     'Policy Leader',
};

export function buildMarkers(filteredData) {
  return filteredData
    .filter(c => c.currentEra)
    .map(country => ({
      lat: country.coordinates[0],
      lng: country.coordinates[1],
      size: Math.max(0.35, (country.currentEra.impact_score / 5) * 1.2),
      color: COLOR_MAP[country.narrative_weight] || '#ffffff',
      country: country.country,
      code: country.code,
      narrative_weight: country.narrative_weight,
      currentEra: country.currentEra,
      layer: country.layer,
      description: country.description,
    }));
}

export function buildArcs(filteredData) {
  const pioneers = filteredData.filter(c =>
    c.narrative_weight === 'pioneer_arc' && c.currentEra?.impact_score >= 4
  );
  const arcs = [];
  for (let i = 0; i < pioneers.length - 1; i++) {
    arcs.push({
      startLat: pioneers[i].coordinates[0],
      startLng: pioneers[i].coordinates[1],
      endLat: pioneers[i + 1].coordinates[0],
      endLng: pioneers[i + 1].coordinates[1],
      color: ['#00d4ff44', '#00d4ff11'],
    });
  }
  return arcs;
}

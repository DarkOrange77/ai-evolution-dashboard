import { useMemo } from 'react';
import evolutionData from '../data/evolution.json';
import { buildMarkers, buildArcs } from '../utils/globeMarkers';

export function useFilteredData(selectedEra, showLayer2) {
  const filteredData = useMemo(() => {
    return evolutionData
      .filter(c => showLayer2 || c.layer === 1)
      .map(country => ({
        ...country,
        currentEra: country.eras.find(e => e.era === selectedEra),
      }));
  }, [selectedEra, showLayer2]);

  const markers = useMemo(() => buildMarkers(filteredData), [filteredData]);
  const arcs    = useMemo(() => buildArcs(filteredData),    [filteredData]);

  return { filteredData, markers, arcs };
}
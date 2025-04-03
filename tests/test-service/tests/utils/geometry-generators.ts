// test-service/tests/test-utils/geometry-generators.ts
export function randomPoint(): string {
  const lng = -180 + Math.random() * 360;
  const lat = -90 + Math.random() * 180;
  return `POINT(${lng.toFixed(6)} ${lat.toFixed(6)})`;
}

export function randomLineString(numPoints = 3): string {
  const points = Array.from({ length: numPoints }, () => {
    const lng = -180 + Math.random() * 360;
    const lat = -90 + Math.random() * 180;
    return `${lng.toFixed(6)} ${lat.toFixed(6)}`;
  });
  return `LINESTRING(${points.join(', ')})`;
}

export function randomPolygon(): string {
  // Generate a simple quadrilateral
  const centerLng = -180 + Math.random() * 360;
  const centerLat = -90 + Math.random() * 180;
  const size = 0.1 + Math.random() * 5;
  
  const coords = [
    [centerLng - size, centerLat - size],
    [centerLng + size, centerLat - size],
    [centerLng + size, centerLat + size],
    [centerLng - size, centerLat + size],
    [centerLng - size, centerLat - size] // Close the ring
  ];
  
  return `POLYGON((${coords.map(c => c.join(' ')).join(', ')}))`;
}

export function randomMultiPoint(numPoints = 3): string {
  const points = Array.from({ length: numPoints }, () => {
    const lng = -180 + Math.random() * 360;
    const lat = -90 + Math.random() * 180;
    return `(${lng.toFixed(6)} ${lat.toFixed(6)})`;
  });
  return `MULTIPOINT(${points.join(', ')})`;
}

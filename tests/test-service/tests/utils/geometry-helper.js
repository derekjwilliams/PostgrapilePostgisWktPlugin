// tests/utils/geometry-helper.ts
export function parsePoint(ewkb) {
    const view = new DataView(ewkb.buffer, ewkb.byteOffset);
    const isLittleEndian = view.getUint8(0) === 1;
    const type = view.getUint32(1, isLittleEndian);
    const srid = view.getUint32(5, isLittleEndian);
    if ((type & 0xFFFF) !== 1)
        throw new Error('Not a Point geometry');
    const x = view.getFloat64(9, isLittleEndian);
    const y = view.getFloat64(17, isLittleEndian);
    return `SRID=${srid};POINT(${x} ${y})`;
}
export function parseLineString(ewkb) {
    const view = new DataView(ewkb.buffer, ewkb.byteOffset);
    const isLittleEndian = view.getUint8(0) === 1;
    const type = view.getUint32(1, isLittleEndian);
    const srid = view.getUint32(5, isLittleEndian);
    if ((type & 0xFFFF) !== 2)
        throw new Error('Not a LineString geometry');
    const numPoints = view.getUint32(9, isLittleEndian);
    const points = [];
    let offset = 13;
    for (let i = 0; i < numPoints; i++) {
        const x = view.getFloat64(offset, isLittleEndian);
        const y = view.getFloat64(offset + 8, isLittleEndian);
        points.push(`${x} ${y}`);
        offset += 16;
    }
    return `SRID=${srid};LINESTRING(${points.join(', ')})`;
}

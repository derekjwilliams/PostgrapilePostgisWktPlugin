CREATE TABLE test_data (
  id SERIAL PRIMARY KEY,
  geom_point GEOMETRY(Point, 4326),
  geom_line GEOMETRY(LineString, 4326),
  geom_polygon GEOMETRY(Polygon, 4326),
  geom_polygon_with_holes GEOMETRY(Polygon, 4326),
  geom_multipoint GEOMETRY(MultiPoint, 4326),
  created_at TIMESTAMP DEFAULT NOW()
);
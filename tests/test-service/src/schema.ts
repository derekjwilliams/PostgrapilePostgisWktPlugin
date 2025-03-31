import { pgTable, serial, timestamp, geometry, index } from "drizzle-orm/pg-core";

export const testData = pgTable(
  "test_data",
  {
    id: serial("id").primaryKey(),
    
    // Point geometry
    geomPoint: geometry("geom_point", { 
      type: "point", 
      srid: 4326 
    }),
    
    // LineString geometry
    geomLine: geometry("geom_line", { 
      type: "linestring", 
      srid: 4326 
    }),
    
    // Polygon geometry
    geomPolygon: geometry("geom_polygon", { 
      type: "polygon", 
      srid: 4326 
    }),
    
    // Polygon with holes (same type as regular polygon)
    geomPolygonWithHoles: geometry("geom_polygon_with_holes", { 
      type: "polygon", 
      srid: 4326 
    }),
    
    // MultiPoint geometry
    geomMultipoint: geometry("geom_multipoint", { 
      type: "multipoint", 
      srid: 4326 
    }),
    
    createdAt: timestamp("created_at").defaultNow(),
  },
);

// Type inference for your table
export type TestData = typeof testData.$inferSelect;
export type NewTestData = typeof testData.$inferInsert;

// tests/test-service/src/db-client.ts
import { Client } from 'pg';
import { TestData } from './schema'; // Add this import

export class GeometryVerifier {
  public client: Client;

  constructor(connectionString: string) {
    this.client = new Client({ connectionString });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  async getTableColumns(tableName: string) {
    const result = await this.client.query<{
      column_name: string;
      data_type: string;
      udt_name: string;
    }>({
      text: `
        SELECT column_name, data_type, udt_name
        FROM information_schema.columns
        WHERE table_name = $1
      `,
      values: [tableName]
    });
    
    return result.rows;
  }

  // Simple WKT comparison using ST_AsText
  async verifyGeometryText(id: number, column: string, expectedWkt: string) {
    const result = await this.client.query<{ wkt: string }>({
      text: `SELECT ST_AsText(${column}) as wkt FROM test_data WHERE id = $1`,
      values: [id]
    });
    return result.rows[0]?.wkt === expectedWkt;
  }

  // SRID-aware comparison using ST_AsEWKT
  async verifyGeometryEwkt(id: number, column: string, expectedEwkt: string) {
    const result = await this.client.query<{ ewkt: string }>({
      text: `SELECT ST_AsEWKT(${column}) as ewkt FROM test_data WHERE id = $1`,
      values: [id]
    });
    return result.rows[0]?.ewkt === expectedEwkt;
  }

  // For binary verification when needed
  async verifyGeometryBinary(
    id: number, 
    column: string, 
    expectedHex: string
  ) {
    const result = await this.client.query<{ ewkb: string }>({
      text: `SELECT encode(ST_AsEWKB(${column}), 'hex') as ewkb FROM test_data WHERE id = $1`,
      values: [id]
    });
    return result.rows[0]?.ewkb === expectedHex.toLowerCase();
  }

  async verifyPrecision(id: string, expectedWkt: string, decimals: number) {
      const res = await this.client.query(`
        SELECT ST_AsText(
          ST_SnapToGrid(
            geom_point,
            ${10 ** -decimals}
          )
        ) as snapped
        FROM test_data
        WHERE id = $1
      `, [id]);
      
      return res.rows[0].snapped === expectedWkt;
    } 
  

  async verifyGeometry(
    id: number,
    column: keyof TestData,
    expectedWkt: string
  ): Promise<boolean> {
    const result = await this.client.query<{ wkt: string }>({
      text: `SELECT ST_AsText(${column}) as wkt FROM test_data WHERE id = $1`,
      values: [id]
    });
    return result.rows[0]?.wkt === expectedWkt;
  }
  
}
import 'graphile-config'
import 'postgraphile'
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber'
import { makePgService } from 'postgraphile/adaptors/pg'

import { PgPostgisWktPlugin } from 'postgraphile-postgis-wkt'

const preset: GraphileConfig.Preset = {
  extends: [
    PostGraphileAmberPreset,
  ],
  plugins: [PgPostgisWktPlugin],
  pgServices: [
    makePgService({
      connectionString: process.env.DB_CONNECTION,
      schemas: [process.env.DB_SCHEMA || 'public'],
    }),
  ],
  grafast: {
    explain: true,
  },
}

export default preset

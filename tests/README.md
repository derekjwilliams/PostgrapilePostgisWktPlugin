## First Time Setup

createdb -U [_postgres_user_] wkt_postgraphile_test 

psql -U postgres -d wkt_postgraphile_test -c "CREATE EXTENSION postgis;"
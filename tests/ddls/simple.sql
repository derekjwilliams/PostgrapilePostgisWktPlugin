-- public.test_data definition

-- Drop table

-- DROP TABLE public.test_data;

CREATE TABLE public.test_data (
	id serial4 NOT NULL,
	geom_point public.geometry(point, 4326) NULL,
	geom_line public.geometry(linestring, 4326) NULL,
	geom_polygon public.geometry(polygon, 4326) NULL,
	geom_polygon_with_holes public.geometry(polygon, 4326) NULL,
	geom_multipoint public.geometry(multipoint, 4326) NULL,
	created_at timestamp DEFAULT now() NULL,
	geog_point public.geography(point, 4326) NULL,
	geog_line public.geography(linestring, 4326) NULL,
	geog_polygon public.geography(polygon, 4326) NULL,
	geog_polygon_with_holes public.geography(polygon, 4326) NULL,
	geog_multipoint public.geography(multipoint, 4326) NULL,
	CONSTRAINT test_data_pkey PRIMARY KEY (id)
);


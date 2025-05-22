---CONNECT TO PROJECT BY THIS ---
---host: aws-0-ap-southeast-2.pooler.supabase.com
---port: 6543
---database: postgres
---user: postgres.tchwwnlazebhayosesvf
---pool_mode:transaction

---OR---
--key: postgresql://postgres.tchwwnlazebhayosesvf:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres

-------
------- Create species_locations table
-------
create table species_locations (
  id         serial primary key,
  species_id  int,
  name       text,
  lat        double precision,
  long       double precision,
  year       int,
  period     text,
  count      int,
  region     text,
  site_name  text,
  site_desc  text
);

create extension if not exists postgis;
-- Using postgis---
alter table species_locations
add column geom geometry(Point, 4326);

update species_locations
set geom = ST_SetSRID(ST_MakePoint(long, lat), 4326)
where lat is not null and long is not null;

create index if not exists idx_species_geom
on species_locations using gist (geom);

select * from species_locations;

CREATE POLICY "Allow read access to all"
  ON species_locations
  FOR SELECT
  USING (true);

UPDATE species_locations
SET period = '2011-2020'
WHERE period = '2010-2020';

Select *
from species_locations
where species_id= 5;

Select distinct year
from species_locations;

-------
--- Create Tree forest loss table ---
-------
create table tree_cover_loss_aus (
    year INT PRIMARY KEY,
    tree_cover_loss_ha FLOAT,
    co2_emissions_mg FLOAT
);

-------
------- Prediction dataset ---
-------
CREATE TABLE prediction_dataset (
    year INTEGER PRIMARY KEY,
    species_count INTEGER,
    urban_area_ha DOUBLE PRECISION,
    burned_area_ha DOUBLE PRECISION,
    rainfall_annual_mm DOUBLE PRECISION,
    temp_annual_c DOUBLE PRECISION,
    population DOUBLE PRECISION
);

-------
--- Victoria council info ----
-------
CREATE TABLE vic_council_details (
    council_name TEXT,
    tel_phone TEXT,
    ceo_name TEXT,
    postcode TEXT,
    fax TEXT,
    mayor TEXT,
    email TEXT,
    website TEXT,
    address TEXT
);
PRIMARY KEY (postcode);

--- Policies and supporters ---
create table policies (
  id int primary key,
  name text not null,
  description text
);

create table policy_supporters (
  id serial primary key,
  full_name text,
  electorate text,
  party text,
  house text,
  agreement float,
  voted boolean,
  category text,
  policy_id int references policies(id) on delete cascade
);

select s.full_name, s.party, p.name as policy_title
from policy_supporters s
join policies p on s.policy_id = p.id
where s.electorate ilike '%victoria%';

select * from vic_council_details
where postcode ='3000';
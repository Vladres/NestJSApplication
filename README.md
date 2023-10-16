DB CREATION DATA

CREATE TABLE "cities" (
"id" SERIAL NOT NULL,
"name" character varying NOT NULL,
"description" character varying NULL,
CONSTRAINT "PK_589871db156cc7f92942334ab7e" PRIMARY KEY ("id")
);


CREATE TABLE "residents" (
"id" SERIAL NOT NULL,
"first_name" character varying NOT NULL,
"last_name" character varying NOT NULL,
"city_id" integer NOT NULL,
CONSTRAINT "PK_589871db156cc7f929424ab7e" PRIMARY KEY ("id")
);


ALTER TABLE "residents" ADD CONSTRAINT "FK_45d515503b0253f6443a4a97cf8" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO "cities" ("name", "description")
VALUES
  ('New York City', 'The city that never sleeps'),
  ('Los Angeles', 'The entertainment capital of the world'),
  ('Chicago', 'The Windy City'),
  ('San Francisco', 'The Golden Gate City'),
  ('Seattle', 'Emerald City in the Pacific Northwest'),
  ('Miami', 'Magic City'),
  ('Boston', 'The Cradle of Liberty'),
  ('Houston', 'Space City'),
  ('Atlanta', 'The Big Peach'),
  ('Dallas', 'The Big D'),
  ('Denver', 'Mile High City'),
  ('Phoenix', 'Valley of the Sun'),
  ('Philadelphia', 'The City of Brotherly Love');


INSERT INTO "residents" ("first_name", "last_name", "city_id")
VALUES
  ('John', 'Doe', 1),
  ('Jane', 'Smith', 2),
  ('Michael', 'Johnson', 3),
  ('Emily', 'Brown', 4),
  ('Christopher', 'Davis', 5),
  ('Jessica', 'Taylor', 6),
  ('David', 'Lee', 7),
  ('Jennifer', 'Clark', 8),
  ('Daniel', 'Anderson', 9),
  ('Lisa', 'Harris', 10),
  ('Matthew', 'Martin', 11),
  ('Sarah', 'Moore', 12),
  ('Ryan', 'Garcia', 13),
  ('Vlad', 'Novod', 2),
  ('Test', 'Case', 2),
  ('Jane', 'Case', 2);

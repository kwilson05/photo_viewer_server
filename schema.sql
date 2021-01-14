drop table "public"."Users";
drop table "public"."ImageFile";

CREATE TABLE Users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE ImageFile(
  id SERIAL PRIMARY KEY NOT NULL,
  "filePath" VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  "photoTakenDate" DATE,
  "createdDate" TIMESTAMP NOT NULL default current_timestamp
);

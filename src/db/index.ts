import { Client, Pool } from "pg";

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "D4v1dPGz0z4",
  database: "midterm_db",
});

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "D4v1dPGz0z4",
  database: "midterm_db",
});

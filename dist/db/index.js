import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schemas/schema.js";
import { config } from "../config.js";
const migrationsClient = postgres(config.db.url, { max: 1 });
export const db = drizzle(migrationsClient, { schema });

process.loadEnvFile();
import type { MigrationConfig } from "drizzle-orm/migrator";

import path from "path";

const projectRoot = process.cwd();
const migrationsFolderPath = path.join(projectRoot, "src", "db");

type DBConfig = {
    url: string,
    migrationConfig: MigrationConfig
}

type APIConfig = {
    db: DBConfig
}

export const config: APIConfig = {
    db: {
        url: process.env.DB_URL ? process.env.DB_URL : "",
        migrationConfig: {
            migrationsFolder: migrationsFolderPath
        }
    }
}
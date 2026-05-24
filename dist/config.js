process.loadEnvFile();
import path from "path";
const projectRoot = process.cwd();
const migrationsFolderPath = path.join(projectRoot, "src", "db");
export const config = {
    db: {
        url: process.env.DB_URL ? process.env.DB_URL : "",
        migrationConfig: {
            migrationsFolder: migrationsFolderPath
        }
    }
};

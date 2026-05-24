import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/schemas/schema.ts",
    out: "./src/db",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgres://postgres:postgres@localhost:5432/webscraper?sslmode=disable"
    }
});
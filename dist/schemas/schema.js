import { pgTable, varchar } from "drizzle-orm/pg-core";
export const products = pgTable("consumables", {
    productName: varchar("productName").primaryKey(),
    description: varchar("description"),
    imageUrl: varchar("imageUrl"),
    price: varchar("price")
});

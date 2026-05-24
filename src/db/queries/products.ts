import { db } from "../index.js";
import { NewProduct, products } from "../../schemas/schema.js";

export async function addConsumable(product: NewProduct){
    await db.insert(products)
            .values(product)
            .onConflictDoUpdate({target: products.productName, set: {imageUrl: product.imageUrl, price: product.price, description: product.description}});
}

export async function getConsumables(){
    const results = await db.select().from(products);

    return results;
}
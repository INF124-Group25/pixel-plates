import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { user } from './db/schema'

// const connectionString = process.env.DATABASE_URL;
// if(!connectionString) throw Error("db/index.ts not loaded");
// const client = postgres(connectionString)
// const db = drizzle(client);

// (async()=> {
//     const allUsers = await db.select().from(user);
// })()

//USE THIS TO TEST OUT OUTPUTS !
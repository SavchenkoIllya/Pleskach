const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function seedAdmin(client) {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          telgram_link VARCHAR(255),
          whatsapp_link VARCHAR(255)
        );
      `;

    const hashedPassword = await bcrypt.hash("katepleskatch02906", 10);
    const insertUser = await client.sql`
          INSERT INTO users (name, email, password)
          VALUES ('Екатерина Плескач', 'katepleskatch@gmail.com', ${hashedPassword});
        `;

    console.log(`Created "users" table`);
    return { createTable, insertUser };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        name VARCHAR(255) NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        problem TEXT
      );`;

    console.log("created posts table");

    return createTable;
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

async function main() {
  const client = await db.connect();

  await seedAdmin(client);
  await seedPosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

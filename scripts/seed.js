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

    // const hashedPassword = await bcrypt.hash("katepleskatch02906", 10);
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
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        problem TEXT,
        is_read BOOLEAN DEFAULT false,
        date DATE NOT NULL
      );`;

    console.log("successfully created posts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

// async function addPhoneToUser(client) {
//   try {
//     const updateTable = await client.sql`
//     ALTER TABLE users
//     ADD COLUMN phone VARCHAR(20);`;

//     console.log("Table was successfully updated");
//     return updateTable;
//   } catch (error) {
//     console.error("Cannot update table", error);
//   }
// }



async function main() {
  const client = await db.connect();

  await seedAdmin(client);
  await seedPosts(client);
  // await addPhoneToUser(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

// async function dropTable(client) {
//   try {
//     const drop = await client.sql`
//     DROP TABLE IF EXISTS posts
//     `;
//   } catch (error) {
//     console.error("Error dropping DB:", error);
//   }
// }

// async function drop() {
//   const client = await db.connect();
//   await dropTable(client);
//   await seedPosts(client);

//   await client.end();
// }

// drop().catch((error) => {
//   console.log(error);
// });

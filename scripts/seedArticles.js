const { db } = require("@vercel/postgres");

async function seedArticles(client) {
  try {
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS articles (
          id SERIAL PRIMARY KEY,
          author_id INTEGER REFERENCES users(id),
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          tags VARCHAR(255),
          is_published BOOLEAN DEFAULT TRUE,
          creation_date DATE NOT NULL,
          updating_date DATE
        );`;

    console.log("successfully created articles table");
    return createTable;
  } catch (error) {
    console.error("Error seeding articles:", error);
  }
}

async function alterArticles(client) {
  try {
    const changeTable = await client.sql`
        ALTER TABLE articles
        ADD COLUMN tags_array TEXT[],
        DROP COLUMN tags;`;

    console.log("successfully changed articles table");
    return changeTable;
  } catch (error) {
    console.error("Error changing articles:", error);
  }
}

async function main() {
  const client = await db.connect();

  await alterArticles(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

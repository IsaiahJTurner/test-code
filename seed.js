import massive from 'massive';
import logger from './logger';

const seed = async () => {
  const db = await massive(process.env.DATABASE_URL);
  await db.query(`
    CREATE TABLE IF NOT EXISTS "thing" (
      "id" serial,
      "title" text,
      "author" text,
      "content" text,
      PRIMARY KEY ("id")
    )
  `);
  await db.query(`
    INSERT INTO "thing" ("title", "author", "content")
      VALUES ('Cool Thing', 'Thing Creator', 'This is a cool thing.')
  `);
};

seed().catch(err => logger.error('Failed to seed database', err));

import fs from 'fs';
import path from 'path';
import pool from './db';

async function runMigrations() {
  const sqlPath = path.resolve(__dirname, '../db-migrations/001 - db.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  try {
    await pool.query(sql);
    console.log('✅ SQL processing succeeded.');
  } catch (error) {
    console.error('❌ Failed to process SQL', error);
  } finally {
    await pool.end();
  }
}

runMigrations();
import Database from "better-sqlite3";
const db = new Database("./data/database.db");
export default db;

// db.prepare(
//   `CREATE TABLE IF NOT EXISTS "diakok"(
//     id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
//     nev TEXT,
//     email TEXT,
//     telefon TEXT,
//     telepules TEXT)`,
// ).run();

// db.prepare(
//   `CREATE TABLE IF NOT EXISTS "orak"(
//     id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
//     datum DATE,
//     targy TEXT,
//     csoport TEXT,
//     terem TEXT,
//     tanar TEXT,
//     ferohely INTEGER,
//     orasorszama INTEGER)`,
// ).run();

// db.prepare(
//   `CREATE TABLE IF NOT EXISTS "kapcsolo"(
//     id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
//     diakid INTEGER,
//     oraid INTEGER)`,
// ).run();
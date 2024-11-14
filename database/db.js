const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            address TEXT,
            full_name TEXT,
            car_plate TEXT NOT NULL UNIQUE
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS parking_areas (
            area_id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            area_name TEXT NOT NULL
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS parking_sessions (
            session_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            area_id INTEGER,
            start_time DATETIME,
            end_time DATETIME,
            price REAL
        )
    `);
});

module.exports = db;

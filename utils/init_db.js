const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const initDb = () => {
    db.serialize(() => {
        db.run("CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, address TEXT, full_name TEXT, car_plate TEXT NOT NULL UNIQUE)");
    
        db.run("CREATE TABLE parkings (\
            parking_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            email TEXT NOT NULL UNIQUE, \
            city_id INTEGER, \
            area_id INTEGER, \
            calculation_id INTEGER NOT NULL, \
            active BOOL, \
            start_time TEXT, \
            end_time TEXT)");
    
        db.run("CREATE TABLE cities (city_id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT NOT NULL UNIQUE)");
    
        db.run("CREATE TABLE parking_areas (area_id INTEGER PRIMARY KEY AUTOINCREMENT, area_name TEXT NOT NULL, city_id INTEGER NOT NULL)");
    
        db.run("CREATE TABLE calculation (calculation_id INTEGER PRIMARY KEY AUTOINCREMENT, city_id INTEGER NOT NULL UNIQUE, rate INTEGER, start_time TEXT, end_time TEXT)");
    
        const stmt_users = db.prepare("INSERT INTO users (email, address, full_name, car_plate) VALUES (?, ?, ?, ?)");
        stmt_users.run("alonof27@gmail.com", "galaxy far far away", "Alon Ofir", "21-705-78");
        stmt_users.finalize();
    
        const stmt_parkings = db.prepare("INSERT INTO parkings (parking_id, email, city_id, area_id, calculation_id, active, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        stmt_parkings.run(1, "alonof27@gmail.com", 1, 1, 1, false, null, null);
        stmt_parkings.finalize();
    
    
        const stmt_cities = db.prepare("INSERT INTO cities (city_id, city) VALUES (?, ?)");
        stmt_cities.run(1, "New York");
        stmt_cities.finalize();
    
    
        const stmt_parking_areas = db.prepare("INSERT INTO parking_areas (area_id, area_name, city_id) VALUES (?, ?, ?)");
        stmt_parking_areas.run(1, "Brooklyn", 1);
        stmt_parking_areas.finalize();
    
    
        const stmt_calculation = db.prepare("INSERT INTO calculation (calculation_id, city_id, rate, start_time, end_time) VALUES (?, ?, ?, ?, ?)");
        stmt_calculation.run(1, 1, 5, "8:00", "9:00");
        stmt_calculation.finalize();
    
        db.each("SELECT user_id, email, address, full_name, car_plate FROM users", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.user_id}: ${row.email}, ${row.address}, ${row.full_name}, ${row.car_plate}`);
            }
        });
    
        db.each("SELECT parking_id, email FROM parkings", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.parking_id}: ${row.email}`);
            }
        });
    
        db.each("SELECT city_id, city FROM cities", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.city_id}: ${row.city}`);
            }
        });
    
        db.each("SELECT area_id, area_name FROM parking_areas", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.area_id}: ${row.area_name}`);
            }
        });
    
        db.each("SELECT calculation_id, city_id, rate FROM calculation", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.calculation_id} ${row.city_id} ${row.rate}`);
            }
        });
    });
}


module.exports =  {
    initDb
}
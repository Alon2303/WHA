const db = require('../db');

const startParking = (req, res) => {
    const { email, city_id, area_id, calculation_id } = req.body;
    const start_time = new Date().toISOString();

    const query = `
        INSERT INTO parkings (email, city_id, area_id, calculation_id, active, start_time)
        VALUES (?, ?, ?, ?, 1, ?)
    `;

    db.run(query, [email, city_id, area_id, calculation_id, start_time], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ parking_id: this.lastID });
    });
};

module.exports = startParking;
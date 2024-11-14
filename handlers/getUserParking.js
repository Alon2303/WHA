const db = require('../db');

const getUserParking = (req, res) => {
    const { email } = req.query;

    const query = `
        SELECT parkings.*, cities.city, parking_areas.area_name
        FROM parkings
        JOIN cities ON parkings.city_id = cities.city_id
        JOIN parking_areas ON parkings.area_id = parking_areas.area_id
        WHERE parkings.email = ?
    `;

    db.all(query, [email], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

module.exports = getUserParking;


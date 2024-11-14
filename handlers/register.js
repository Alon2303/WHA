const db = require('../db');

const register = (req, res) => {
    const { email, address, full_name, car_plate } = req.body;

    const query = `
        INSERT INTO users (email, address, full_name, car_plate)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [email, address, full_name, car_plate], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ user_id: this.lastID });
    });
};

module.exports = register;

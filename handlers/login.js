const db = require('../db');

const login = (req, res) => {
    const { email, car_plate } = req.body;

    const query = `
        SELECT * FROM users WHERE email = ? AND car_plate = ?
    `;

    db.get(query, [email, car_plate], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user_id: row.user_id });
    });
};

module.exports = login;
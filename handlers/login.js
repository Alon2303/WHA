const db = require('../database/db');

const login = (req, res) => {
    const { email, car_plate } = req.body;
    console.log(email, car_plate);

    const query = `
        SELECT * FROM users WHERE email = ? AND car_plate = ?
    `;

    console.log(query);

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
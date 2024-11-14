const db = require('../db');

const stopParking = (req, res) => {
    const { email } = req.body;
    const end_time = new Date().toISOString();

    // Query to fetch calculation rate based on city and time
    const getCalculationQuery = `
        SELECT calculation.rate
        FROM parkings
        JOIN calculation ON parkings.calculation_id = calculation.calculation_id
        WHERE parkings.email = ? AND parkings.active = 1
    `;

    db.get(getCalculationQuery, [email], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const rate = row ? row.rate : 0;
        const stopQuery = `
            UPDATE parkings
            SET end_time = ?, active = 0
            WHERE email = ? AND active = 1
        `;

        db.run(stopQuery, [end_time, email], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Parking session stopped', email });
        });
    });
};

module.exports = stopParking;


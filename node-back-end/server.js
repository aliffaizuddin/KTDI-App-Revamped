const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Error handling middleware
const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
};

// JWT verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (user_id, role) to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Authentication WHERE email = $1', [email]);
        if (result.rowCount === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user_id: user.user_id, role: user.role });
    } catch (error) {
        errorHandler(res, error);
    }
});

// Authentication Routes
app.get('/authentication', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Authentication');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/authentication', async (req, res) => {
    const { email, password, phone_number, otp_verified, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO Authentication (email, password, phone_number, otp_verified, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, hashedPassword, phone_number, otp_verified ?? false, role ?? 'user']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/authentication/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { email, password, phone_number, otp_verified, role } = req.body;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const result = await pool.query(
            'UPDATE Authentication SET email = $1, password = COALESCE($2, password), phone_number = $3, otp_verified = $4, role = $5 WHERE user_id = $6 RETURNING *',
            [email, hashedPassword, phone_number, otp_verified, role, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/authentication/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Authentication WHERE user_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// RoomRegistration Routes
app.get('/room-registration', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM RoomRegistration');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/room-registration', verifyToken, async (req, res) => {
    const { room_type, block, level, number, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO RoomRegistration (room_type, block, level, number, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [room_type, block, level, number, status ?? 'available']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/room-registration/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { room_type, block, level, number, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE RoomRegistration SET room_type = $1, block = $2, level = $3, number = $4, status = $5 WHERE room_id = $6 RETURNING *',
            [room_type, block, level, number, status, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/room-registration/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM RoomRegistration WHERE room_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// RoomBooking Routes
app.get('/room-booking', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM RoomBooking');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/room-booking', verifyToken, async (req, res) => {
    const { user_id, room_id, start_date, end_date, approval_status, payment_details } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO RoomBooking (user_id, room_id, start_date, end_date, approval_status, payment_details) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, room_id, start_date, end_date, approval_status ?? 'Pending', payment_details]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/room-booking/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, room_id, start_date, end_date, approval_status, payment_details } = req.body;
    try {
        const result = await pool.query(
            'UPDATE RoomBooking SET user_id = $1, room_id = $2, start_date = $3, end_date = $4, approval_status = $5, payment_details = $6 WHERE booking_id = $7 RETURNING *',
            [user_id, room_id, start_date, end_date, approval_status, payment_details, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/room-booking/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM RoomBooking WHERE booking_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// HallBooking Routes
app.get('/hall-booking', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM HallBooking');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/hall-booking', verifyToken, async (req, res) => {
    const { user_id, booking_date, booking_time, approval_status, payment_details } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO HallBooking (user_id, booking_date, booking_time, approval_status, payment_details) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, booking_date, booking_time, approval_status ?? 'Pending', payment_details]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/hall-booking/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, booking_date, booking_time, approval_status, payment_details } = req.body;
    try {
        const result = await pool.query(
            'UPDATE HallBooking SET user_id = $1, booking_date = $2, booking_time = $3, approval_status = $4, payment_details = $5 WHERE booking_id = $6 RETURNING *',
            [user_id, booking_date, booking_time, approval_status, payment_details, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Hall booking not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/hall-booking/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM HallBooking WHERE booking_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Hall booking not found' });
        }
        res.json({ message: 'Hall booking deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// ElectricalAppliance Routes
app.get('/electrical-appliance', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ElectricalAppliance');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/electrical-appliance', verifyToken, async (req, res) => {
    const { user_id, appliance_list, total_amount, payment_details } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ElectricalAppliance (user_id, appliance_list, total_amount, payment_details) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, appliance_list, total_amount, payment_details]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/electrical-appliance/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, appliance_list, total_amount, payment_details } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ElectricalAppliance SET user_id = $1, appliance_list = $2, total_amount = $3, payment_details = $4 WHERE appliance_id = $5 RETURNING *',
            [user_id, appliance_list, total_amount, payment_details, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Appliance not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/electrical-appliance/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM ElectricalAppliance WHERE appliance_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Appliance not found' });
        }
        res.json({ message: 'Appliance deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// ReportDamage Routes
app.get('/report-damage', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ReportDamage');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/report-damage', verifyToken, async (req, res) => {
    const { user_id, image_path, type_of_damage, description, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ReportDamage (user_id, image_path, type_of_damage, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, image_path, type_of_damage, description, status ?? 'Draft']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/report-damage/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, image_path, type_of_damage, description, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ReportDamage SET user_id = $1, image_path = $2, type_of_damage = $3, description = $4, status = $5 WHERE report_id = $6 RETURNING *',
            [user_id, image_path, type_of_damage, description, status, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/report-damage/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM ReportDamage WHERE report_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// Feedback Routes
app.get('/feedback', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Feedback');
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.post('/feedback', verifyToken, async (req, res) => {
    const { user_id, college_rating, accommodation_rating, facilities_rating, recommendation } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Feedback (user_id, college_rating, accommodation_rating, facilities_rating, recommendation) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, college_rating, accommodation_rating, facilities_rating, recommendation]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.put('/feedback/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, college_rating, accommodation_rating, facilities_rating, recommendation } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Feedback SET user_id = $1, college_rating = $2, accommodation_rating = $3, facilities_rating = $4, recommendation = $5 WHERE feedback_id = $6 RETURNING *',
            [user_id, college_rating, accommodation_rating, facilities_rating, recommendation, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

app.delete('/feedback/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Feedback WHERE feedback_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
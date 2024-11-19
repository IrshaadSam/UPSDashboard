const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',    // Host of your MySQL server
    user: 'root',         // MySQL username
    password: '',         // MySQL password
    database: 'orders_db' // Database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// API to fetch order by OrderID
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const query = 'SELECT * FROM orders WHERE OrderID = ?';
    db.query(query, [orderId], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

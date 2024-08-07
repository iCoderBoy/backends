// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the file name
    }
});

const upload = multer({ storage: storage });

app.get('/api/news', (req, res) => {
    const sql = 'SELECT * FROM news';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/news', upload.single('image'), (req, res) => {
    const { title, content, author } = req.body;
    const imagePath = req.file ? '/uploads/' + req.file.filename : null;
    const sql = 'INSERT INTO news SET ?';
    const newArticle = { title, content, author, image_path: imagePath };
    db.query(sql, newArticle, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put('/api/news/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    let sql = 'UPDATE news SET title = ?, content = ?, author = ?';
    const values = [title, content, author];

    if (req.file) {
        sql += ', image_path = ?';
        values.push('/uploads/' + req.file.filename);
    }

    sql += ' WHERE id = ?';
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

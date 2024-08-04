const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "esp"
})


app.get('/data', (req, res)=>{
    const sql = "SELECT * FROM SensorData";
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/average', (req, res)=>{
    const sql = "SELECT ROUND(AVG(value1), 1) as value1, ROUND(AVG(value2), 1) as value2, ROUND(AVG(value3), 1) as value3 FROM sensordata;"
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.listen(8081, ()=>{
    console.log('app running on port ', 8081)
})
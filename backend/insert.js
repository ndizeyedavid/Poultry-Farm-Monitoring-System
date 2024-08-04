// const express = require('express');
const mysql = require('mysql2');
// const cors = require('cors');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "esp"
})


function insertThis(){
    const sql = `
    INSERT INTO SensorData(sensor, location, value1, value2, value3) 
    VALUES('S1', 'left wing', '${Math.floor(Math.random() * 80)}', '${Math.floor(Math.random() * 80)}', '${Math.floor(Math.random() * 80)}')
    `;
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
        console.log("Data Inserted");
        // return res.json(data);
    });
}

setInterval(insertThis, 1000);

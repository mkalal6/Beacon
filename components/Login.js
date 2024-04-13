const express = require('express');
const app = express();

app.use(express.json());

app.get("/Login", (req,res) => {
    res.send("Login Page");
})
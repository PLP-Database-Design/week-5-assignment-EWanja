const express = require("express");
const app = express()
const mysql = require ('mysql2')
const dotenv = require ('dotenv')

dotenv.config();

//create a db connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    console.log("Succesfully connected to mysql: ", db.threadId)
})
 // Retrieve all patients
app.get('' ,(req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        } 
        
        res.status(200).send(data)
    })
})

// Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    
    db.query(getProviders, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to retrieve providers: " + err)
        }
        res.status(200).send(data)
    })
})
//Filter patients by First Name
app.get('/patients/first-names', (req, res) => {
    const getAllFirstNames = "SELECT first_name FROM patients"
    
    db.query(getAllFirstNames, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to retrieve first names: " + err)
        }
        res.status(200).send(data)
    })
})
app.get('/providers/specialties', (req, res) => {
    const getAllProviders = "SELECT first_name, last_name, provider_specialty FROM providers"

    db.query(getAllProviders, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to retrieve providers: " + err)
        }
        res.status(200).json(data)
    })
})


app.listen(3300,() => {
   console.log("server is running on port 3300...")
})

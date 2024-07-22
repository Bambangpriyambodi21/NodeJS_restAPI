const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db= require('./config/connection.js')
const response = require('./model/response')
const mahasiswaRouter = require('./route/MahasiswaRoute.js')

app.use(bodyParser.json())
app.use(express.json())
app.use('/mahasiswa', mahasiswaRouter);

app.get('/', (req, res) => {
    db.query("Select * from mahasiswa", (error, result)=>{
        response(200, result, "get all data mahasiswa", res)
    })
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
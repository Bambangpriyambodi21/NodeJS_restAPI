const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db= require('./src/config/connection.js')
const response = require('./src/model/response.js')
const mahasiswaRouter = require('./src/route/MahasiswaRoute.js')
const dosenRouter = require('./src/route/DosenRoute.js')

app.use(bodyParser.json())
app.use(express.json())
app.use('/mahasiswa', mahasiswaRouter);
app.use('/dosen', dosenRouter);

app.get('/', (req, res) => {
    db.query("Select * from mahasiswa", (error, result)=>{
        response(200, result, "get all data mahasiswa", res)
    })
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
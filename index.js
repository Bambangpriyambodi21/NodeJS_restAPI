const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db= require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.query("Select * from mahasiswa", (error, result)=>{
        response(200, result, "get all data mahasiswa", res)
    })
    
});

app.get('/get', (req, res) => {
    const nim = req.query.nim
    const nama = req.query.nama
    const alamat = req.query.alamat
    const jenis_kelamin = req.query.jenis_kelamin
    const sql = "select * from mahasiswa where (nim like ? or nama like ? or alamat like ? or jenis_kelamin like ?)";

    db.query(sql, [`%${nim}%`,`%${nama}%`,`%${alamat}%`,`%${jenis_kelamin}%`], (error, result)=>{
        response(200, result, "get mahasiswa by nim", res)
    })
})

app.post('/post', (req, res) => {
    console.log({requestFromOutside : req.body})
    const { nim, nama, alamat, jenis_kelamin } = req.body;
    const sql = "INSERT INTO mahasiswa (nim, nama, alamat, jenis_kelamin) VALUES (?, ?, ?, ?)";
    db.query(sql, [nim,nama,alamat,jenis_kelamin], (error, result)=>{
        const newMahasiswa = {
            nim: nim,
            nama: nama,
            alamat: alamat,
            jenis_kelamin: jenis_kelamin
        };
        if(result?.affectedRows){
            response(200, newMahasiswa, "add new mahasiswa success", res)
        }else{
            response(500, "user already axist", "error", res)
        }
    })
})

app.put('/put', (req, res) => {
    console.log({requestFromOutside : req.body})
    const { nim, nama, alamat, jenis_kelamin } = req.body;
    const sql = "update mahasiswa set nama=?, alamat=?, jenis_kelamin=? where nim=?;";
    db.query(sql, [nama,alamat,jenis_kelamin,nim], (error, result)=>{
        const newMahasiswa = {
            nim: nim,
            nama: nama,
            alamat: alamat,
            jenis_kelamin: jenis_kelamin
        };
        if(result?.affectedRows){
            response(200, newMahasiswa, "mahasiswa updated", res)
        }else{
            response(500, "user not found", "error", res)
        }
    })
  })

  app.delete('/delete/:nim', (req, res) => {
    const nim = req.params.nim;
    const sql = "delete from mahasiswa where nim=?";
    db.query(sql, [nim], (error, result)=>{
    if(result?.affectedRows){
        response(200, "Data mahasiswa deleted", "success deleted", res)
    }else{
        response(500, "user not found", "error", res)
    }
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
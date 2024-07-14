const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db= require('../connection')
const response = require('../model/response')

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
    let sql ="";

    if(nim!=null || nama!=null || alamat!=null || jenis_kelamin!=null){
        sql = `select * from mahasiswa where (nim like '%${nim}%' or nama like '%${nama}%' or alamat like '%${alamat}%' or jenis_kelamin like '%${jenis_kelamin}%')`;
    }else{
        sql = `select * from mahasiswa`
    }

    db.query(sql, (error, result)=>{
        response(200, result, "get mahasiswa by nim", res)
    })
})

app.post('/post', (req, res) => {
    console.log({requestFromOutside : req.body})
    const { nim, nama, alamat, jenis_kelamin } = req.body;
    const sql = `INSERT INTO mahasiswa (nim, nama, alamat, jenis_kelamin) VALUES ('${nim}', '${nama}', '${alamat}', '${jenis_kelamin}')`;
    db.query(sql, (error, result)=>{
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
    const sql = `update mahasiswa set nama='${nama}', alamat='${alamat}', jenis_kelamin='${jenis_kelamin}' where nim='${nim}'`;
    db.query(sql, (error, result)=>{
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
    const sql = `delete from mahasiswa where nim='${nim}'`;
    db.query(sql, (error, result)=>{
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
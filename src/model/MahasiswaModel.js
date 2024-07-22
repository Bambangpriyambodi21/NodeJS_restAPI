const db= require('../config/connection')

const getAllMahasiswa = (req) => {
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

    return db.execute(sql)
}

const createMahasiswa = (body) => {
    const sql = `INSERT INTO mahasiswa (nim, nama, alamat, jenis_kelamin) VALUES ('${body.nim}', '${body.nama}', '${body.alamat}', '${body.jenis_kelamin}')`;
    return db.execute(sql);
}

const editMahasiswa = (params, body) => {
    const sql = `update mahasiswa set nama='${body.nama}', alamat='${body.alamat}', jenis_kelamin='${body.jenis_kelamin}' where nim='${params.nim}'`;
    return db.execute(sql);
}

const deleteMahasiswa = (params) => {
    const sql = `delete from mahasiswa where nim='${params.nim}'`;
    return db.execute(sql);
}

module.exports = {
    getAllMahasiswa,
    createMahasiswa,
    editMahasiswa,
    deleteMahasiswa
}
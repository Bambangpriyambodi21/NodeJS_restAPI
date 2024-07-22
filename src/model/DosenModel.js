const db= require('../config/connection')

const getAllDosen = (req) => {
    const id = req.query.id
    const nama = req.query.nama
    const alamat = req.query.alamat
    const nip = req.query.nip
    let sql ="";

    if(id!=null || nama!=null || alamat!=null || nip!=null){
        sql = `select * from dosen where (id like '%${id}%' or nama like '%${nama}%' or alamat like '%${alamat}%' or nip like '%${nip}%')`;
    }else{
        sql = `select * from dosen`
    }

    return db.execute(sql)
}

const createDosen = (body) => {
    const sql = `INSERT INTO dosen (nama, alamat, nip) VALUES ('${body.nama}', '${body.alamat}', '${body.nip}')`;
    return db.execute(sql);
}

const editDosen = (params, body) => {
    const sql = `update dosen set nama='${body.nama}', alamat='${body.alamat}', nip='${body.nip}' where id='${params.id}'`;
    return db.execute(sql);
}

const deleteDosen = (params) => {
    const sql = `delete from dosen where id='${params.id}'`;
    return db.execute(sql);
}

module.exports = {
    getAllDosen,
    createDosen,
    editDosen,
    deleteDosen
}
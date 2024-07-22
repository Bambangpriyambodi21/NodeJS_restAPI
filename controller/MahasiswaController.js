const mahasiswaModel = require('../model/MahasiswaModel')

const getAllMahasiswa = async (req, res) => {

    try {
        const [data] = await mahasiswaModel.getAllMahasiswa(req);
    
        res.json({
            message: 'Get all user',
            data: data
        })
        
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

const createMahasiswa = async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        await mahasiswaModel.createMahasiswa(body);
    
        res.json({
            message: 'Create mahasiswa',
            data: body
        })
        
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

const updateMahasiswa = async (req, res) => {
    const params = req.params;
    const body = req.body;
    console.log(body);
    console.log(params);

    try {
        await mahasiswaModel.editMahasiswa(params, body);
    
        res.json({
            message: 'Update mahasiswa',
            data: body
        })
        
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

const deleteMahasiswa = async (req, res) => {
    const params = req.params;
    console.log(params);

    try {
        await mahasiswaModel.deleteMahasiswa(params);
    
        res.json({
            message: 'Delete mahasiswa'
        })
        
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

module.exports={
    getAllMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa
}
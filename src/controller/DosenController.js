const dosenModel = require('../model/DosenModel');

const getAllDosen = async (req, res) => {
    try {
        const [data] = await dosenModel.getAllDosen(req);

        res.json({
            message: "get all dosen",
            data: data
        })
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

const createDosen = async (req, res) => {
    const data = req.body;

    try {
        await dosenModel.createDosen(data);

        res.json({
            message: "create dosen",
            data: data
        })
    } catch (error) {
        res.json({
            serverMessage: error,
        })
    }
}

const updateDosen = async (req, res) => {
    const params = req.params;
    const body = req.body;
    try {
        await dosenModel.editDosen(params, body)

        res.json({
            message: "update dosen",
            data: body
        })
    } catch (error) {
        res.json({
            serverMessage: error
        })
    }
}

const deleteDosen = async (req, res) => {
    const params = req.params;
    try {
        await dosenModel.deleteDosen(params)

        res.json({
            message: "delete dosen"
        })
    } catch (error) {
        res.json({
            serverMessage: error
        })
    }
}


module.exports = {
    getAllDosen,
    createDosen,
    updateDosen,
    deleteDosen
}
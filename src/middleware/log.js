const logs = (req, res, next) => {
    console.log("loging berhasil");
    next();
}

exports.module = logs;
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const response = require('./src/model/response.js')
const mahasiswaRouter = require('./src/route/MahasiswaRoute.js')
const dosenRouter = require('./src/route/DosenRoute.js')
const jwtValidation = require('./src/middleware/JWTValidation.js');
const authRouter = require('./src/route/AuthRoute.js');
const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.use(express.json())

app.use('/auth', authRouter);

app.post('/register', async (req, res) => {
      try {
          const salt = await bcrypt.genSalt(10)
          const password = await bcrypt.hash(req.body.password, salt)
          res.json({
            email: req.body.email,
            password: password
          })
      } catch (err) {
          return res.status(400).json({ message: err.message })
      }
})

app.use(jwtValidation);

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
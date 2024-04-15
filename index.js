const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const User = require('./model')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.set("strictQuery", false);
const config = require('./config/key');
const mongoDB = config.mongoURI;

main().catch((err) => console.log(err));
async function main() {
  if (await mongoose.connect(mongoDB)) {
    console.log('MongoDB is Connected...')
  }
}

app.post('/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.get('/login', (req, res) => {
    User.findOne({ email: req.body.password }, (err, user) => {
        if (!user) return res.json({
            success: false,
            message: 'There is no such email.'
        })
        // if there is such email in db, check the password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "Your password is wrong." })
            
            user.generateToken((err, user) => {
                // start from lecture #12
            })
        })
    })
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
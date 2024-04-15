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
    res.status(200)
    const user = new User(req.body)
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
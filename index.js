const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.set("strictQuery", false);
const mongoDB = 'mongodb+srv://joshuagermany:joshua2003@training.ygcsn6c.mongodb.net/?retryWrites=true&w=majority&appName=training';

main().catch((err) => console.log(err));
async function main() {
  if (await mongoose.connect(mongoDB)) {
    console.log('MongoDB is Connected...')
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
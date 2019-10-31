const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const bodyParser = require('body-parser');

const savedPatterns = [];


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/hello', cors(), (req, res) => {
  res.send('YES, I\'m awake!!')
})

app.get('/sounds/:sound', cors(), (req, res) => {
  res
    .sendfile('./assets/' + req.params.sound)
})

app.post('/pattern', cors(), (req, res) => {

})

app.get('/pattern')

app.get('/pattern:id')

app.listen(port, () => console.log(`Sound API up and running on port ${port}!`))


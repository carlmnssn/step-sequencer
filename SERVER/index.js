const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

const sounds = {
  kick: '/sounds/kick.wav',
  chimes: '/sounds/chimes.wav',
  snare: '/sounds/snare.wav',
  shaker: '/sounds/shaker.wav',
  hihat: '/sounds/hihat.wav'
}

app.use('/sounds', cors(), express.static('assets'));

app.get('/hello', cors(), (req, res) => {
  res.send('hello')
})


app.listen(port, () => console.log(`Sound API up and running on port ${port}!`))


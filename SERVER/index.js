const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;


app.use('/sounds', cors(), express.static('assets'));

app.get('/hello', cors(), (req, res) => {
  res.send('YES, I\'m awake!!')
})

app.listen(port, () => console.log(`Sound API up and running on port ${port}!`))


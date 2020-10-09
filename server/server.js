const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// app.use('/', express.static('public'));
app.use(cors());

var fetch = require('./server.json');

// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
// });

app.get('/budget', (req, res) => {
    // res.json(budget);
    res.json(fetch);
});

app.listen(port, () => {
    console.log('API served at http://localhost:', +port);
});

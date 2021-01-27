const express = require('express');

const app = express();

app.listen(3000, () => console.log('Server listening on port 3000'));
app.get('/appointments', (req, res) => res.send('Server GETting. All good\nXABLAAAAU'));

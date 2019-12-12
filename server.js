const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const Users = require('./routes/Users');
const mongoURL = ' mongodb://127.0.0.1:27017/applicants';

app.use(bodyparser.json({ limit: '1200kb' }));
app.use(cors());
app.use(
    bodyparser.urlencoded({
        extended: false
    })
)
app.use('/users', Users)

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
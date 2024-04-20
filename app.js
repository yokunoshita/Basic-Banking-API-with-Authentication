const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const router = require('./routes/v1/index');
app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`App berjalan pada port : ${port}`);
});

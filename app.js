require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const YAML = require('yaml');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));


const file = fs.readFileSync('./api-doc.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const router = require('./routes/v1/index.js');
app.use('/api/v1', router);

app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});


module.exports = app;
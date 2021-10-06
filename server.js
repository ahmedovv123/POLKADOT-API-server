const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./nodeConnection');

const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Polkadot server API',
            version: '1.0.0',
            description: 'Polkadot Api for interact interacting with node',
            contact: {
                name: 'Ahmet',
                email: 'ahmedovv123@gmail.com'
            },
            servers: ["http://localhost:8080"]
        }
    },
    apis: ["*.js", "app/routes/node.routes.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.get("/", (req,res) => {
    res.json({message: "Welcome"});
});

require("./app/routes/node.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   
});


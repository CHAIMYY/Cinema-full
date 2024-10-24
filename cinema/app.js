const express = require('express');
const path = require('path');
const app = express();
const router = require('./src/routes/router');
const dbConnect = require('./src/config/config');
const cors = require("cors");

class Server {
    constructor(port = 3001) {
        this.port = port;
        this.app = express();
        this.db();
        this.config();
        this.routing();
    }

    db() {
        dbConnect()
    }

    config() {
        this.app.use(express.json());
        this.app.set('view engine', 'ejs');
        this.app.use(cors({
            origin: "http://localhost:3000",
            methods:['GET','POST', 'PUT'],
            credentials : true
        }));
    }

    routing() {
        this.app.use('/', router);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server started on port ' + this.port);
        });
    }



}

new Server().start();
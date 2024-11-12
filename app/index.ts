import express from 'express'
const index = express();
import bodyParser from 'body-parser';

import http, {Server, IncomingMessage, ServerResponse} from 'http';

index.use(bodyParser.urlencoded({extended: false}));
index.use(bodyParser.json());

index.use((req:IncomingMessage, res:ServerResponse, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.setHeader("Acess-Contron-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.statusCode = 200;
        return res.statusCode.json({});
    }
    next();
});



module.exports = index;
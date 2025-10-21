import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from 'body-parser';
//import cookieParser from "cookie-parser";
import dataSource from "./config/data-source";
import indexRoutes from "./routes/index";

const server = express();
const port = 30000;

var corsOptions = {
    origin: "http://localhost:30000",
    optionsSuccessStatus: 200
};

server.use(cors(corsOptions));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.urlencoded({ extended: true }));
//server.use(cookieParser());
server.use(express.json());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use('/',  indexRoutes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

dataSource.initialize()
    .then(async() => {
        console.log('Connected to DB');
        server.emit('ready');
    })
    .catch((error) => console.log(error));

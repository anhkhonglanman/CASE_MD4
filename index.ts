import express from 'express';
import bodyParser from "body-parser";
import router from "./src/router/router";
import cors from 'cors'
import {AppDataSource} from "./src/data-source";
const app = express();
const hostname = '127.0.0.1';
const port = 8181;
const FE_SERVER_PORT = 3000;
AppDataSource.initialize().then(() => {
    console.log('Connect database success')
})
app.use(cors({
    // origin: the port that front end server is running on
    origin: `http://${hostname}:${FE_SERVER_PORT}`,
    // allowedHeaders: ["my-custom-header"],
    credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router)

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
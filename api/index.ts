import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import { sequelize as db } from "./db";
import router from "./src/routes/index"

const server = express();


//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use('/', router);

//conexiones
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "0.0.0.0";



db.sync({ force: false }).then(() => {
    console.log("database coneccted!");

    server.listen(PORT, () => {
        console.log(`%s listening at ${PORT}`); 
    });
});



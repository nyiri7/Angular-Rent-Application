import express from "express";
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import cors from 'cors'
import { getRoute } from "./router";

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors({origin:'http://localhost:4200',credentials: true}));
    app.use(express.json());
    app.use("/api",getRoute());
    app.listen(3000,()=>{
        console.log("Server started at port: 3000");
    });

}).catch(error => console.log(error));

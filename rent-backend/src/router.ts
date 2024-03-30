import express from "express";
import { Controller } from "./controller/base.controller";

export function getRoute(){
    const router = express.Router();
    const controllera = new Controller(); 
    router.get("/a",(req,res)=>{
        res.json("alma");
    });

    router.get("/korte",controllera.getAll);
    return router;
}
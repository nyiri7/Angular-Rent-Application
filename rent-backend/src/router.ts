import express from "express";
import { Controller } from "./controller/base.controller";
import { VehicleController} from "./controller/vehicleController";
import { CustomerController } from "./controller/customerController";

export function getRoute(){
    const router = express.Router();


    const Customercontroller = new CustomerController();
    router.get('/customers',Customercontroller.getAll);
    router.get('/customers/:id',Customercontroller.getOne);
    router.delete('/customers/:id',Customercontroller.delete);
    router.post('/customers', Customercontroller.create);
    router.put('/customers', Customercontroller.update);


    const Vehiclecontroller = new VehicleController();
    router.get('/vehicles',Vehiclecontroller.getAll);
    router.get('/vehicles/:id',Vehiclecontroller.getOne);
    router.delete('/vehicles/:id',Vehiclecontroller.delete);
    router.post('/vehicles', Vehiclecontroller.create);
    router.put('/vehicles', Vehiclecontroller.update);
    return router;
}
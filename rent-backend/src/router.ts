import express from "express";
import { Controller } from "./controller/base.controller";
import { VehicleController} from "./controller/vehicleController";
import { CustomerController } from "./controller/customerController";
import { RentController } from "./controller/rentController";
import { HistoryController } from "./controller/historyController";

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

    const Rentcontroller = new RentController();
    router.get('/rents',Rentcontroller.getAll);
    router.get('/rents/:id',Rentcontroller.getOne);
    router.get('/rents/customer/:id',Rentcontroller.getByUserID);
    router.get('/rents/vehicle/:id',Rentcontroller.getByVehicleID);
    router.delete('/rents/:id',Rentcontroller.delete);
    router.post('/rents', Rentcontroller.create);
    router.put('/rents', Rentcontroller.update);

    const Historycontroller = new HistoryController();
    router.get('/historys',Historycontroller.getAll);
    router.get('/historys/:id',Historycontroller.getOne);
    router.get('/historys/vehicleid/:id',Historycontroller.getByVehicleID);
    router.delete('/historys/:id',Historycontroller.delete);
    router.post('/historys', Historycontroller.create);
    router.put('/historys', Historycontroller.update);
    return router;
}
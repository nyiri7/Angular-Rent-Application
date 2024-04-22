import express from "express";
import { Controller } from "./controller/base.controller";
import { VehicleController} from "./controller/vehicleController";
import { CustomerController } from "./controller/customerController";
import { RentController } from "./controller/rentController";
import { HistoryController } from "./controller/historyController";
import { UserController } from "./controller/userController";
import { TransactionController } from "./controller/transaction.controller";
import { CategoryController } from "./controller/category.controller";
import { checkUser } from "./protect-routes";


export function getRoute(){
    const router = express.Router();


    const Customercontroller = new CustomerController();
    router.get('/customers',Customercontroller.getAll);
    router.get('/customers/:id',Customercontroller.getOne);
    router.delete('/customers/:id',checkUser,Customercontroller.delete);
    router.post('/customers',checkUser, Customercontroller.create);
    router.put('/customers',checkUser, Customercontroller.update);


    const Vehiclecontroller = new VehicleController();
    router.get('/vehicles',Vehiclecontroller.getAll);
    router.get('/vehicles/:id',Vehiclecontroller.getOne);
    router.delete('/vehicles/:id',checkUser,Vehiclecontroller.delete);
    router.post('/vehicles',checkUser, Vehiclecontroller.create);
    router.put('/vehicles',checkUser, Vehiclecontroller.update);

    const Rentcontroller = new RentController();
    router.get('/rents',Rentcontroller.getAll);
    router.get('/rents/:id',Rentcontroller.getOne);
    router.get('/rents/customer/:id',Rentcontroller.getByUserID);
    router.get('/rents/vehicle/:id',Rentcontroller.getByVehicleID);
    router.delete('/rents/:id',checkUser,Rentcontroller.delete);
    router.post('/rents',checkUser, Rentcontroller.create);
    router.put('/rents',checkUser, Rentcontroller.update);

    const Historycontroller = new HistoryController();
    router.get('/historys',Historycontroller.getAll);
    router.get('/historys/vehicleid/:id',Historycontroller.getByVehicleID);
    router.post('/historys/endrent',checkUser, Historycontroller.endrent);


    const userController = new UserController();

    router.get('/user', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user',checkUser, userController.create);
    router.put('/user',checkUser, userController.update);
    router.delete('/user/:id',checkUser, userController.delete);
    router.post('/user/login',checkUser, userController.login);

    const transactionController = new TransactionController();
    router.post('/transaction',checkUser, transactionController.create);
    router.get('/transactions/of/:userId', transactionController.getTransactionsOfUser);

    const categoryController = new CategoryController();
    router.get('/category', categoryController.getAll);
    return router;
}
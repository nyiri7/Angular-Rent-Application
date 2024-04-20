import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { History } from "../entity/History";
import { Rent } from "../entity/Rent";
import { Vehicle } from "../entity/Vehicle";
import { Controller } from "./base.controller";

export class RentController extends Controller {
    repository = AppDataSource.getRepository(Rent);

    create = async (req, res) => {
      try {
          let vehicle = await AppDataSource.getRepository(Vehicle).findOneBy({ id: req.body.vehicleid });
          let customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerid });

          if(vehicle && customer){
            const history = AppDataSource.getRepository(History).create();
            history.historyType = "Kölcsönzés";
            history.historydate = new Date();
            history.price = 0;
            history.vehicle = vehicle;
  
            const entity = this.repository.create();
            entity.id =null;
            entity.customer = customer;
            entity.vehicle = vehicle;
            entity.rentStart = new Date();
      
            const result = await this.repository.save(entity);
  
            vehicle.status = "Kölcsönzött";
  
            await AppDataSource.getRepository(Vehicle).save(vehicle);
            await AppDataSource.getRepository(History).save(history);
  
      
            res.json(result);
          }else{
            this.handlerError(res,"",402,"No avaiable vehicle or customer provided.");
          }
      } catch (err) {
        this.handlerError(res, err);
      }
    };

    getByUserID = async (req, res) => {
        try {
          const entities = await this.repository.find({
            where: {
              customer: {
                id: req.params.customerid
              }
            },
            relations:{vehicle:true},
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };


      getByVehicleID = async (req, res) => {
        try {
          const entities = await this.repository.findOne({
            where: {
              vehicle: {
                id: req.params.id
              }
            },
            relations:{customer:true},
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };


      getAll = async (req, res) => {
        try {
          const entities = await this.repository.find({
            relations:{customer:true,vehicle:true},
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };

      getOne = async (req, res) => {
        try {
          const entities = await this.repository.findOne({
            where: {
              id: req.params.id
            },
            relations:{customer:true,vehicle:true},
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };
}
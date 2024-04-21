import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { History } from "../entity/History";
import { Rent } from "../entity/Rent";
import { Vehicle } from "../entity/Vehicle";
import { Controller } from "./base.controller";

export class HistoryController extends Controller {
    repository = AppDataSource.getRepository(History);


    getAll = async (req, res) => {
      try {
        const entities = await this.repository.find({relations:{vehicle:true}});
        res.json(entities);
      } catch (err) {
        this.handlerError(res, err);
      }
    };
    endrent = async (req, res) => {
      try {
          let vehicle = await AppDataSource.getRepository(Vehicle).findOneBy({ id: req.body.vehicleid });
          let customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerid });

          if(vehicle && customer){
            const entity = this.repository.create();
            entity.id =null;
            entity.historyType = "Kölcsönzés vége";
            entity.historydate = (new Date()).toDateString();
            entity.price = req.body.price;
            entity.vehicle = vehicle;
            entity.Desc = "Kölcsönző: " + customer.id+ " " + customer.firstName+ " "+ customer.lastName;
            if(req.body.crashed){entity.Desc += " Crashed"}
            const result = await this.repository.save(entity);
  
            vehicle.status = "Elérhető";
  
            await AppDataSource.getRepository(Vehicle).save(vehicle);
  
      
            res.json(result);
          }else{
            this.handlerError(res,"",402,"No vehicle provided.");
          }
      } catch (err) {
        this.handlerError(res, err);
      }
    };



    getByVehicleID = async (req, res) => {
        try {
          const entities = await this.repository.find({
            where: {
              vehicle: {
                id: req.params.id
              }
            },relations:{vehicle:true}
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };
}
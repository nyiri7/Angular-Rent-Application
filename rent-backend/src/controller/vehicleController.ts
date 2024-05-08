import { AppDataSource } from "../data-source";
import { History } from "../entity/History";
import { Vehicle } from "../entity/Vehicle";
import { Controller } from "./base.controller";

export class VehicleController extends Controller {
    repository = AppDataSource.getRepository(Vehicle);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;
            
            const result = await this.repository.save(entity);

            if(result){
                const hist =  AppDataSource.getRepository(History).create()

                hist.id = null;
                hist.historyType = "Új jármű";
                hist.historydate = (new Date()).toISOString();
                hist.price = entity.boughtfor;
                hist.vehicle = result;
                await AppDataSource.getRepository(History).save(hist);
            }



      
            res.json(result);
        } catch (err) {
          this.handlerError(res, err);
        }
      };
}
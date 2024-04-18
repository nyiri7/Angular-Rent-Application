import { AppDataSource } from "../data-source";
import { History } from "../entity/History";
import { Rent } from "../entity/Rent";
import { Controller } from "./base.controller";

export class HistoryController extends Controller {
    repository = AppDataSource.getRepository(History);

    getByVehicleID = async (req, res) => {
        try {
          const entities = await this.repository.find({
            where: {
              vehicle: {
                id: req.params.customerid
              }
            },
          });
          res.json(entities);
        } catch (err) {
          this.handlerError(res, err);
        }
      };
}
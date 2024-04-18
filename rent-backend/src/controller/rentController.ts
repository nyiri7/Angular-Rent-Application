import { AppDataSource } from "../data-source";
import { Rent } from "../entity/Rent";
import { Controller } from "./base.controller";

export class RentController extends Controller {
    repository = AppDataSource.getRepository(Rent);

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
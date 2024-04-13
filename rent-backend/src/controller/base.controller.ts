import { Repository } from "typeorm";

export abstract class Controller {
  repository: Repository<any>;

  getAll = async (req, res) => {
    try {
      const entities = await this.repository.find();
      res.json(entities);
    } catch (err) {
      this.handlerError(res, err);
    }
  };
  getOne = async (req, res) => {
    try {
      const entities = await this.repository.findOneBy({ id: req.params.id });
      res.json(entities);
    } catch (err) {
      this.handlerError(res, err);
    }
  };
  create = async (req, res) => {
    try {
        const entity = this.repository.create(req.body as object);
        entity.id = null;
  
        const result = await this.repository.save(entity);
  
        res.json(result);
    } catch (err) {
      this.handlerError(res, err);
    }
  };
  update = async (req, res) => {
    try {
      let entity = await this.repository.findOneBy({ id: req.body.id });
      entity = this.repository.create(req.body as object);
      const result = await this.repository.save(entity);

      res.json(result);
    } catch (err) {
      this.handlerError(res, err);
    }
  };
  delete = async (req, res) => {
    try {
        const entity = await this.repository.findOneBy({ id: req.params.id });
        if(!entity){
            this.handlerError(res,null,404,"No entity found with this id, cannot delete it.")
        }

        await this.repository.remove(entity);
        res.status(200).send();
    } catch (err) {
      this.handlerError(res, err,null,"alma");
    }
  };

  handlerError = (
    res,
    err,
    status = 500,
    message = "Internal server error."
  ) => {
    if (err) {
      console.log(err);
    }
    res.status(status).json({ error: message });
  };
}

import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entity = this.repository.create();
            entity.id=null;
            entity.email=req.body.email;
            entity.name=req.body.name;
            entity.phone=req.body.phone;

            const insertedEntity = await this.repository.save(entity);
            insertedEntity.userId = insertedEntity.id.toString().padStart(6, '0');

            entity.password = await bcrypt.hash(req.body.password, 12);

            await this.repository.save(insertedEntity);

            res.json(insertedEntity);
        } catch (err) {
            this.handlerError(res, err);
        }
    };



    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: [ 'id', 'password' ]
            });
    
            if (!user) {
                return this.handlerError(res, null, 401, 'Incorrect email or password.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handlerError(res, null, 401, 'Incorrect email or password.');
            }
    
            const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token });
        } catch (err) {
            this.handlerError(res, err);
        }
    };
}
import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";

export class TransactionController extends Controller {
    repository = AppDataSource.getRepository(Transaction);
    userRepository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as Transaction);
            delete entity.id;
            delete entity.transactionDate;

            const sourceUser = await this.userRepository.findOne({
                where: { id: entity.source.id }
            });
            if (!sourceUser) {
                return this.handlerError(res, null, 404, 'A küldő felhasználó nem létezik.');
            }

            const destUser = await this.userRepository.findOne({
                where: { id: entity.destination.id }
            });
            if (!destUser) {
                return this.handlerError(res, null, 404, 'A fogadó felhasználó nem létezik.');
            }

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handlerError(res, err);
        }
    };

    getTransactionsOfUser = async (req, res) => {
        try {
            const userId = req.params.userId;

            // select transactions where source.id = userId or destination.id = userId
            const transactions = await this.repository.find({
                where: [
                    { source: { id: userId } },
                    { destination: { id: userId } }
                ]
            });

            res.json(transactions);
        } catch (err) {
            this.handlerError(res, err);
        }
    };
}
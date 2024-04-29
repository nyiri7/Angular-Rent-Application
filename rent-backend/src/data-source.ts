import "reflect-metadata"
import { DataSource} from "typeorm"
import { User } from "./entity/User"
import { Customer } from "./entity/Customer"
import { History } from "./entity/History"
import { Rent } from "./entity/Rent"
import { Vehicle } from "./entity/Vehicle"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "rentdb",
    synchronize: true,
    logging: false,
    entities: [User,Vehicle,Customer,History,Rent],
    migrations: [],
    subscribers: [],
})

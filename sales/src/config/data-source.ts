import { DataSource, DataSourceOptions, getMetadataArgsStorage } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import config from "./config";
import InitSeeder from '../database/seeders/init.seeder';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    username: config.POSTGRES_USERNAME,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    migrations: [
        '../database/migrations/*.ts',
    ],
    seeds: [
        InitSeeder
    ],
};

export default new DataSource(options);

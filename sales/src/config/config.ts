import dotenv from "dotenv";
import path from 'path';

const configFile = '.env';
dotenv.config({path: path.resolve(__dirname, configFile)});

const { SECRET_KEY, PORT, POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_SYNC, POSTGRES_SSL } = process.env;

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = parseInt(String(process.env.POSTGRES_PORT), 10) || 5440

export default {
    SECRET_KEY, PORT, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_SYNC, POSTGRES_SSL
};

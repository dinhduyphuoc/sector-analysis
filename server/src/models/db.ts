import { Pool } from "pg";
import * as configProvider from "../utils/config.provider";

let pool: Pool;

export default function getDBConnectionPool(): Pool {
  if (!pool) {
    pool = new Pool({
      user: configProvider.getValue("DB.user"),
      host: configProvider.getValue("DB.host"),
      database: configProvider.getValue("DB.dbName"),
      password: configProvider.getValue("DB.password"),
      port: Number(configProvider.getValue("DB.port")),
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  return pool;
}

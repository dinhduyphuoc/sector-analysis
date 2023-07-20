export default {
  port: {
    doc: "The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned",
    format: "Number",
    default: 0,
    nullable: true,
    env: "PORT",
  },
  defaultStartDate: {
    doc: "Default start date for stock chart",
    format: "String",
    default: "2019-01-01",
    nullable: false,
    env: "DEFAULT_START_DATE",
  },
  DB: {
    user: {
      doc: "Database username name",
      format: "String",
      default: "user",
      nullable: false,
      env: "DB_USER",
    },
    password: {
      doc: "Database connection password. Don't put production code here",
      format: "String",
      default: "myuserpassword",
      nullable: false,
      env: "DB_PASSWORD",
    },
    dbName: {
      doc: "Default database name",
      format: "String",
      default: "defaultdb",
      nullable: false,
      env: "DB_NAME",
    },
    host: {
      doc: "Database cluster host URL",
      format: "String",
      default: "localhost",
      nullable: false,
      env: "DB_HOST",
    },
    port: {
      doc: "Database cluster port",
      format: "Number",
      default: "54320",
      nullable: false,
      env: "DB_PORT",
    },
  },
};

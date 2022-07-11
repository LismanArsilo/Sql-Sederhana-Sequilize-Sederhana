import config from "./config";
import Sequelize from "sequelize";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: "postgres",
  }
);
sequelize
  .authenticate()
  .then(() => console.info("Connected has been estabilished successfully"))
  .catch((err) => console.info(err));

export { sequelize };

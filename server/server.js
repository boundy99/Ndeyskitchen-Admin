require("dotenv").config();
const app = require("./index");
const chalk = require("chalk");

const DatabaseConnection = require("./database/databaseConnection");

if (DatabaseConnection) {
  app.listen(process.env.PORT, () => {
    console.log(chalk.yellow("Server is listenning on port", process.env.PORT));
  });
}

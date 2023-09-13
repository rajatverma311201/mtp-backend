const dotenv = require("dotenv");
const app = require("./src/app");
dotenv.config({ path: "./config.env" });

const pool = require("./src/db");


const options = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
};

const port = process.env.PORT || 3000;
pool.connect(options).then(() => {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
});

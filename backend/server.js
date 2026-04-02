require("dotenv").config();

const server = require("./src/app");
const connectTodb = require("./src/config/database");

connectTodb();

server.listen(3000, () => {
  console.log("server is running at 3000");
});

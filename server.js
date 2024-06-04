const express = require("express");
const bodyParser = require("body-parser");
const database = require("./project-api-barber/database");
const authRoutersRegisterBarber = require("./project-api-barber/router/routerRegisterLogin");
const authRoutersRegisterPelangan = require("./project-api-barber/router/routerRegisterLoginPelanggan");
const port = 3400;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", authRoutersRegisterBarber);
app.use("/api", authRoutersRegisterPelangan);

app.listen(port, () => {
  console.log(`SERVER BERJALAN ${[port]}`);
});

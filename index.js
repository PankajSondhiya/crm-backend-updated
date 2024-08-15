require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { DB_URL, DB_NAME } = require("./configs/db.config");
const { PORT } = require("./configs/server.config");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); // req.body

mongoose
  .connect(`${DB_URL}`)
  .then(() => console.log("Connected to mongodb successfully"))
  .catch((ex) => console.log("Error in connection", ex));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/ticket.routes")(app);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

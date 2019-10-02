const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-o8cij.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// req.query = Acessar Query Params ( para filtros )
// req.params = Acessar Route params ( para edição , delete)
// req.body = acessar corpo da requiisição ( para criação, edição )
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);
app.listen(3333);

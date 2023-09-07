const express = require("express");
//Build Express server
const app = express();
require("dotenv").config();
const dbConnection = require("./db/config");
dbConnection();

//Parsear los datos que vienen en formato json
app.use(express.json());
//Rutas
// app.get("/", (req, res) => {
//   console.log("ruta del landing page");
//   res.json({
//     User: "Lokesh Pereiro",
//     ok: true,
//   });
// });
app.use(express.static("public"));
app.use("/api/auth", require("./routes/auth")); //! La Ruta y el Código

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server running on port ${port}`));

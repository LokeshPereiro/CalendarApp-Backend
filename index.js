const express = require("express");
//Build Express server
const app = express();
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config");

//Parsear los datos que vienen en formato json
app.use(express.json());
app.use(cors());
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

const startServer = async () => {
  const port = process.env.PORT || 8000;
  try {
    await dbConnection(process.env.DB_URI);
    app.listen(port, console.log(`Server running on port ${port}..`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

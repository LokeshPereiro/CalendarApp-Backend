const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const dbConnection = (URI) => {
  return mongoose.connect(
    URI,
    console.log("~Connected to MongoDB Successfully..")
  );
};

module.exports = { dbConnection };

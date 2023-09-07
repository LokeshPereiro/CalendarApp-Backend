const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      console.log("~Connected to MongoDB Successfully..")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;

const mongoose = require("mongoose");
const MONGO_SERVER =
  process.env.MONGO_SERVER ||
  "mongodb+srv://luvhatehero1:Q6D7Cx4RCrQcZcF0@cluster0.w4jc97e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = {
  async connect() {
    try {
      await mongoose.connect(`${MONGO_SERVER}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connecting to db on ${MONGO_SERVER}`);
    } catch (err) {
      console.log(`Error connecting to db: ${err}`);
    }
  },
  disconnect() {
    return mongoose.connection.close(() => {
      console.log("Database connection closed");
    });
  },
};

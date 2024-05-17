const mongoose = require("mongoose");
const MONGO_SERVER =
  process.env.MONGO_SERVER ||
  "mongodb+srv://alvis:0FYQJWjEGzWXFJYp@cluster0.3agzaxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

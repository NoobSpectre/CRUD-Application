const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //mongodb connection setup
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected`);
  } catch (err) {
    console.log(err.message);
    console.log(`MongoDB connection failed`);
    // process.exit(1);
  }
};

module.exports = connectDB;

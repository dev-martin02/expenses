const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://friendly-bombolone-b19b9a.netlify.app',
  'https://main--friendly-bombolone-b19b9a.netlify.app'
];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
const expenseRoute = require("./routes/expenseRout");
const userRoute = require("./routes/userRoute");

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.secretUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Timeout after 15s instead of 30s
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Function to start the server
const startServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Main function to run the application
const main = async () => {
  await connectDB(); // Wait for database connection
  
  // Apply routes
  app.use(expenseRoute);
  app.use(userRoute);
  
  // Start the server
  startServer();
};

// Run the main function
main().catch(err => console.error(err));

// Error handling for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

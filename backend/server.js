const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Fail fast with a clear message instead of a cryptic mongoose crash
if (!process.env.MONGO_URI) {
  console.error(
    "\n❌ MONGO_URI is not set.\n" +
      "   Make sure a file named exactly '.env' exists in the backend/ folder\n" +
      `   (expected at: ${path.resolve(__dirname, ".env")})\n` +
      "   and that it contains a line like:\n" +
      "   MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce\n"
  );
  process.exit(1);
}

connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite dev server
  process.env.FRONTEND_URL // Production frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json()); // to accept JSON data in req.body

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`)
);

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();

connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API OS RUNNING...");
});

// Product Api routes
app.use("/api/products", productRoutes);

// // User Api routes
 app.use("/api/users", userRoutes);

 // Order Api routes
 app.use("/api/orders", orderRoutes);

 app.get('/api/config/paypal', (req,res) =>
   res.send({clientId: process.env.PAYPAL_CLIENT_ID})
 );

 app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// Middle wares for global error handling in api
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

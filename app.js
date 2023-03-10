const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const ordersRoute = require("./routes/orders");
const shippingRoutes = require("./routes/shippingPrice");
const testEmailRoute = require("./routes/test");
const initialSetup = require("./libs/initialSetup");

//creates initialSetup if not created yet
initialSetup.createRoles();
//creates admin user if not created yet
initialSetup.createUser();

app.use(express.json());
app.use(cors({ origin: "*"}));

app.get("/", (req, res) => {
  res.status(200).json("welcome to the api");
});

app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", ordersRoute);
app.use("/api/categories", categoriesRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/email", testEmailRoute);

mongoose
  .connect(
    "mongodb+srv://user:gayatry@cluster0.5yfsd.mongodb.net/feriahermana?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

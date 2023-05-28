const mongoose =  require( "mongoose")
const dotenv = require('dotenv')
const users = require( "./data/user.js")
const products = require( "./data/products.js")
const User = require( "./data/models/userModel.js")
const Product = require( "./data/models/productModel.js")
const Order = require( "./data/models/orderModel.js")
const connectDB = require( "./config/db.js")

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroy");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
    destroyData()
}
else{
    importData()
}

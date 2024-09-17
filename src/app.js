/* IMPORTS */

require("dotenv").config();

const express = require("express");
const app = express();
const indexRouter = require("./routes/mainRouts.js");
const cartRouter = require("./routes/cartRouts.js");
const adminRouter = require("./routes/adminRouts.js");
const productsRouter = require("./routes/productsRouts.js");
const productsApiRouter = require("./routes/apis/ProductsRouts.js");
const productCategoryRouter = require("./routes/apis/ProductCategoryRouts.js");
const taxesApiRouter = require("./routes/apis/TaxesRouts.js");
const logger = require("morgan");
const cors = require("cors");

/* Settings */
const PORT = process.env.PORT || 3003;
app.use(express.static("public"));
app.use(logger("dev"));



//app.use(bodyParser);

/* Template Engine */
app.set("view engine", "ejs");
app.set("views", "./src/views/");

//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* Routes Asignations */
app.use(indexRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(productsRouter);

/* Apis Routes Asignations */
app.use(productsApiRouter);
app.use(productCategoryRouter);
app.use(taxesApiRouter);

/* Start Server */
app.listen(PORT, () => {
  console.log("Server running in port", PORT);
});

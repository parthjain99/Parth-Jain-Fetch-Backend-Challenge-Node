const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use('/receipts', require('./routes/pointRoute.js'));
app.use(require('./middleware/errorHandler.js'))
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.exports = app;

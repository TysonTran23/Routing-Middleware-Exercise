const express = require("express");
const itemsRoutes = require("./routes/items");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  return res.json(global.items);
});

router.post("/", (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  global.items.push(newItem);
  return res.status(201).json({ added: newItem });
});

router.get("/:name", (req, res) => {
  const foundItem = global.items.find((item) => {
    return item.name === req.params.name;
  });
  if (foundItem === undefined) {
    return res.status(404).json({ error: "Item not found" });
  }
  return res.json(foundItem);
});

router.patch("/:name", (req, res) => {
  const foundItem = global.items.find((item) => {
    return item.name === req.params.name;
  });
  if (foundItem === undefined) {
    return res.status(404).json({ error: "Item not Found" });
  }
  foundItem.name = req.body.name || foundItem.name;
  foundItem.price = req.body.price || foundItem.price;
  return res.json({ updated: foundItem });
});

router.delete("/:name", (req, res) => {
  const itemIdx = global.items.findIndex((item) => {
    return item.name === req.params.name;
  });
  if (itemIdx === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  global.items.splice(itemIdx, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;

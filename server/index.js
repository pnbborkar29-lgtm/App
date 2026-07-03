const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

let items = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price === "") {
    return res.status(400).json({ error: "Name & price are required" });
  }

  const item = {
    id: nextId++,
    name: name.trim(),
    price: parseFloat(price),
  };

  items.push(item);
  res.status(201).json(item);
});

app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, price } = req.body;
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (!name || price === undefined || price === "") {
    return res.status(400).json({ error: "Name and price are required" });
  }

  item.name = name.trim();
  item.price = parseFloat(price);
  res.json(item);
});

app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

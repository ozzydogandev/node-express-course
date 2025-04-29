const express = require("express");
const { products } = require("./data");

const app = express();

app.use(express.static("./public")); 
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});


app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const productID = parseInt(req.params.productID);
  const product = products.find((p) => p.id === productID);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;
  let filtered = [...products];

  if (search) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (maxPrice) {
    filtered = filtered.filter((product) => product.price < Number(maxPrice));
  }

  if (limit) {
    filtered = filtered.slice(0, Number(limit));
  }

  res.json(filtered);
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

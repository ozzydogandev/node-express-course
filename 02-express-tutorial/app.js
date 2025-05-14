const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} [${new Date().toLocaleString()}]`);
    next();
};
app.use(logger);

app.use("/api/v1/people", peopleRouter);

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

const auth = (req, res, next) => {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

app.post('/logon', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Please provide a name" });
}
    res.cookie('name', name);
    res.status(201).json({ message: `Hello, ${name}` });
});

app.delete('/logoff', (req, res) => {
    res.clearCookie('name');
    res.status(200).json({ message: "Logged off successfully" });
});

app.get('/test', auth, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}` });
});  


app.all("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

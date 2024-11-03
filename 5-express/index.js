const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  return res.send("Hello from home page");
});

app.get("/about", (req, res) => {
  return res.send(
    `Hello from about page, Hi ${req.query.name} you are ${req.query.age}`
  );
  //localhost:8000/about?name=rahul&age=20
});

app.listen(port, () => console.log("Server started at port", port));

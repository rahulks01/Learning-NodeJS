const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// app.use((req, res, next) => {
//   console.log("Hello from middleware 2");
//   return res.end("Hey");
// });

// Routes
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users
              .map((user) => `<li>${user.id} ${user.first_name}</li>`)
              .join("")}
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Rahul"); //Adding custom header to the response
  //Always add X in front of custom header

  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const body = req.body;

    const updatedUser = { ...user, ...body };
    users[id - 1] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex((user) => user.id === id);

    const deletedUser = users.splice(idx, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", deletedUser });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required.." });
  }

  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(port, () => console.log(`Server Started at Port: ${port}`));

/*
Note: Most of the plugins usually work by analyzing the headers received in request
      like the urlencoded middleware/plugin checks for content-type in the header
      like x-www-form-urlencoded to parse the data in the body
*/

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  let date = new Date();
  const log = `${date.toDateString()}: ${req.method} ${
    req.url
  } New req. received\n`;

  const myUrl = url.parse(req.url, true);
  // console.log(myUrl);

  fs.appendFile("logs.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.name;
        res.end(`Hi ${username}, I am Rahul Kumar Singh`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your results for " + search);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is a signup form");
        else if (req.method === "POST") {
          //DB Query
          res.end("Success");
        }
      default:
        res.end("404 Not Found :P");
    }
  });
});

// const myServer = http.createServer((req, res) => {
//   const log = `${Date.now()}: ${req.url}  New req. Received\n`;
//   fs.appendFile("logs.txt", log, (err, data) => {
//     res.end("Hello From Server Again");
//   });
// });

// const myServer = http.createServer((req, res) => {
//   console.log("New Req Rec.");
//     console.log(req.headers);

//   res.end("Hello From Server");
// });

myServer.listen(8000, () => console.log("Server Started!"));

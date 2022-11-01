const http = require("http");
const fs = require("fs");
let port = require("minimist")(process.argv.slice(2), {
  default: {
    greeting: "Hello",
  },
});

let home = "";
let project = "";
let registration = "";

fs.readFile("home.html", (err, data) => {
  if (err) {
    throw err;
  }
  home = data;
});
fs.readFile("project.html", (err, data) => {
  if (err) {
    throw err;
  }
  project = data;
});
fs.readFile("registration.html", (err, data) => {
  if (err) {
    throw err;
  }
  registration = data;
});
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/registration":
        response.write(registration);
        response.end();
        break;
      case "/project":
        response.write(project);
        response.end();
        break;
      default:
        response.write(home);
        response.end();
        break;
    }
  })
  .listen(port);

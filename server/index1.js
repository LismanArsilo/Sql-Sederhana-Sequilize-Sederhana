import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

const port = process.env.PORT || 3003;

app.listen(port, () => console.info(`Server listening in port ${port}`));
app.get("/", responseText);
app.get("/json", responseJson);
app.use("*", responseNotFound);

function responseText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello NodeJS`);
}
function responseJson(req, res) {
  res.json({
    employee: {
      emp_id: 100,
      first_name: "Lisman",
      last_name: "Arsilo",
    },
  });
}
function responseNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "Text/plain" });
  res.end("Page Not Found");
}

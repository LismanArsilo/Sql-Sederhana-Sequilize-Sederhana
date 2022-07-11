import dotenv from "dotenv";
import express from "express";
dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "lisman1922",
  database: "belajar_database",
  port: 5432,
});

const app = express();

app.use(express.json());
const port = process.env.PORT || 3003;

app.listen(port, () => console.info(`Server listening on port ${port}`));
// get untuk courses
app.get("/api/course/", (req, res) => {
  pool.query("select * from courses", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/course/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from courses where course_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});

app.post("/api/course/", (req, res) => {
  const { course_id, course_name, sks } = req.body;
  pool.query(
    "insert into courses (course_id, course_name, sks) values ($1,$2,$3)",
    [course_id, course_name, sks],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

app.put("/api/course/:id", (req, res) => {
  const { id } = req.params;
  const { course_id, course_name, sks } = req.body;
  pool.query(
    "update courses set course_id=$1, course_name=$2, sks=$3 where course_id=$4",
    [course_id, course_name, sks, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/course/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from courses where course_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

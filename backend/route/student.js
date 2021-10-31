const { ok } = require("assert");
const express = require("express");
const pool = require("../config/mysql");
const router = express();

//Get all student in mySQL database
router.get("/all", async (req, res) => {
  //create connection to mySQL Database
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const result = await conn.query("SELECT * FROM student");

  //result[0] = data
  res.send(result[0]);
  //when fin close connection to database
  conn.release();
});

// Add student to Student table
// router.post("/add", async (req, res) => {
//   //query from JSON
//   const student = req.body;

//   const id = student.id;
//   const year = student.year;
//   const first_name = student.first_name;
//   const last_name = student.last_name;

//   const conn = await pool.getConnection();
//   await conn.beginTransaction();

//   try {
//     const result = await conn.query(
//       "INSERT INTO student(student_id, year, first_name, last_name) VALUE(?, ?, ?, ?)",
//       [id, year, first_name, last_name]
//     );
//     await conn.commit();
//     res.json({ message: "Success" });
//   } catch {
//     await conn.rollback();
//     res.send("Can't update student");
//   } finally {
//     conn.release();
//   }
// });
module.exports = router;

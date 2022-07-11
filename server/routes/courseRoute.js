import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();
// sql query biasa tidak bisa di bawah karena akan bentrok
// query Sql
router.get("/sql", indexCtrl.courseCtrl.sqlAll);
router.get("/sql/:id", indexCtrl.courseCtrl.sqlOne);
router.post("/sql/", indexCtrl.courseCtrl.sqlCreate);
router.put("/sql/:id", indexCtrl.courseCtrl.sqlUpdate);
router.delete("/sql/:id", indexCtrl.courseCtrl.sqlDeleted);

// RestFull API Sederhana
router.get("/", indexCtrl.courseCtrl.findAll);
router.get("/:id", indexCtrl.courseCtrl.findOne);
router.post("/", indexCtrl.courseCtrl.create);
router.put("/:id", indexCtrl.courseCtrl.update);
router.delete("/:id", indexCtrl.courseCtrl.deleted);
// memasukan 2 table
router.post(
  "/next/",
  indexCtrl.courseCtrl.crateNext,
  indexCtrl.teacherCtrl.create
);

export default router;

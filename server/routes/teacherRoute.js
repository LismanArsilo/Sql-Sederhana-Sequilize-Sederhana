import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

// RestFUll API menggunakan query sql sederhana (harus di atas agar tidak bentrok)
router.get("/sql/", indexCtrl.teacherCtrl.sqlAll);
router.get("/sql/:id", indexCtrl.teacherCtrl.sqlOne);
router.post("/sql/", indexCtrl.teacherCtrl.sqlCreate);
router.put("/sql/:id", indexCtrl.teacherCtrl.sqlUpdate);
router.delete("/sql/:id", indexCtrl.teacherCtrl.sqlDeleted);

// RestFull API Sederhana
router.get("/", indexCtrl.teacherCtrl.findAll);
router.get("/:id", indexCtrl.teacherCtrl.findOne);
router.post("/", indexCtrl.teacherCtrl.create);
router.put("/:id", indexCtrl.teacherCtrl.update);
router.delete("/:id", indexCtrl.teacherCtrl.deleted);
export default router;

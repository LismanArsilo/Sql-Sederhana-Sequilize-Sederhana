import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();
// sql query biasa tidak bisa di bawah karena akan bentrok
// query Sql
router.get("/sql/", indexCtrl.majorCtrl.sqlAll);
router.get("/sql/:id", indexCtrl.majorCtrl.sqlOne);
router.post("/sql/", indexCtrl.majorCtrl.sqlCreate);
router.put("/sql/:id", indexCtrl.majorCtrl.sqlUpdate);
router.delete("/sql/:id", indexCtrl.majorCtrl.sqlDeleted);

// RestFull API Sederhana
router.get("/", indexCtrl.majorCtrl.findAll);
router.get("/:id", indexCtrl.majorCtrl.findOne);
router.post("/", indexCtrl.majorCtrl.create);
router.put("/:id", indexCtrl.majorCtrl.update);
router.delete("/:id", indexCtrl.majorCtrl.deleted);

export default router;

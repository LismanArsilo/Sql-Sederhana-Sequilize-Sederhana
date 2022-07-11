import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";
import uploadDownload from "../../middleware/uploadDownload";

const router = Router();

// sql query biasa tidak bisa di bawah karena akan bentrok
// query Sql
router.get("/sql/", indexCtrl.studentCtrl.sqlAll);
router.get("/sql/:id", indexCtrl.studentCtrl.sqlOne);
router.post("/sql/", indexCtrl.studentCtrl.sqlCreate);
router.put("/sql/:id", indexCtrl.studentCtrl.sqlUpdate);
router.delete("/sql/:id", indexCtrl.studentCtrl.sqlDeleted);

// RestFull API Sederhana
router.get("/", indexCtrl.studentCtrl.findAll);
router.get("/:id", indexCtrl.studentCtrl.findOne);
router.get("/file/:filename", uploadDownload.showFile);
// untuk post di masukan ke dalam uploadDownload terlebih dahulu agar di pisahkan kemudian di olah di next di dalam ctrl create
router.post("/", uploadDownload.uploadFiles, indexCtrl.studentCtrl.create);
router.put("/:id", indexCtrl.studentCtrl.update);
router.delete("/:id", indexCtrl.studentCtrl.deleted);

export default router;

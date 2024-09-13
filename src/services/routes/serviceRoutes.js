import express from "express";
import {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
  getCompletedServices,
} from "../controllers/serviceController.js";

const router = express.Router();

// 모든 서비스 조회
router.get("/", getAllServices);

//완료된 서비스만 조회
router.get("/completed", getCompletedServices);

// 새로운 서비스 생성
router.post("/", createService);

// 특정 서비스 조회 (ID 기반)
router.get("/:id", getServiceById);

// 특정 서비스 업데이트 (ID 기반)
router.put("/:id", updateService);

// 특정 서비스 삭제 (ID 기반)
router.delete("/:id", deleteService);

export default router;

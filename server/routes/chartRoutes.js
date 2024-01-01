import express from "express";
import chartController from "../controllers/chartController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.route('/')
    .get(verifyJWT, chartController.getHomeChart)

export default router;

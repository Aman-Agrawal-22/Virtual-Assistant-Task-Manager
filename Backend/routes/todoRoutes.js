import express from "express";
import { extractTodos, getAllTodos, deleteAllTodos, deleteTaskById } from "../controllers/todoControllers.js";

const router = express.Router();

router.post("/extract-todos", extractTodos); 
router.get("/get-todos", getAllTodos);
router.delete("/delete-todos", deleteAllTodos);
router.delete("/delete/:summaryId/tasks/:taskId",deleteTaskById);
export default router;

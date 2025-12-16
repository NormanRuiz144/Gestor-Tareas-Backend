import Router from "koa-router";
import TaskController from "../controller/task.Controller";
const router = new Router();

// GET
router.get("/tasks", TaskController.getTasks);
// POST
router.post("/tasks", TaskController.createTask);
// PUT
router.put("/tasks/:id", TaskController.updateTask);

export default router;

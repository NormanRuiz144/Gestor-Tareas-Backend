import { TaskType } from "../types/types.js";
import prisma from "../db/client";
import { Context } from "koa";

class TaskController {
  // GET
  static async getTasks(ctx: Context) {
    try {
      const tasks = await prisma.tareas.findMany();
      ctx.body = tasks;
      console.log("Final de la consulta.");
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      ctx.status = 500;
      ctx.body = { error: "Error al obtener las tareas." };
    }
  }
  // POST
  static async createTask(ctx: Context) {
    try {
      const { Titulo, Descripcion } = ctx.request.body as TaskType;

      if (!Titulo || !Descripcion) {
        ctx.status = 400;
        ctx.body = { error: "Titulo y Descripcion son requeridos" };
        return;
      }

      const newTask = await prisma.tareas.create({
        data: {
          Titulo,
          Descripcion,
        },
      });
      ctx.status = 201;
      ctx.body = newTask;
      console.log("Tarea Creada:", newTask);
    } catch (error) {
      console.error("Error detallado:", error);
      ctx.status = 500;
      ctx.body = {
        error: "Error al crear la tarea.",
        details: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
  // PUT
  static async updateTask(ctx: Context) {
    try {
      const id = Number(ctx.params.id);
      const { Estado } = ctx.request.body as TaskType;
      const newEstado = Estado !== undefined ? Estado : true;

      const updatedTask = await prisma.tareas.update({
        where: { Id: id },
        data: {
          Estado: Boolean(newEstado),
        },
      });
      console.log("Tarea Actualizada", updatedTask);
      ctx.body = updatedTask;
      ctx.status = 200;
    } catch (error) {
      console.error("Error al actualizar:", error);
      ctx.status = 500;
      ctx.body = { error: "Error al actualizar la tarea." };
    }
  }
}

export default TaskController;

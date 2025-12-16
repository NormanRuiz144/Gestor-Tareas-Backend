-- CreateTable
CREATE TABLE "Tareas" (
    "Id" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("Id")
);

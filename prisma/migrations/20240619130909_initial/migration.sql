-- CreateTable
CREATE TABLE "habilidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tecnologia" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "projectoHabilidade" (
    "habilidadeId" TEXT NOT NULL,
    "projectoId" TEXT NOT NULL,

    PRIMARY KEY ("habilidadeId", "projectoId"),
    CONSTRAINT "projectoHabilidade_habilidadeId_fkey" FOREIGN KEY ("habilidadeId") REFERENCES "habilidades" ("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "projectoHabilidade_projectoId_fkey" FOREIGN KEY ("projectoId") REFERENCES "projectos" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "projectos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "live" TEXT NOT NULL,
    "logotipo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL,
    "desc" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "contactos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "habilidades_tecnologia_key" ON "habilidades"("tecnologia");

-- CreateIndex
CREATE UNIQUE INDEX "habilidades_slug_key" ON "habilidades"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projectos_slug_key" ON "projectos"("slug");

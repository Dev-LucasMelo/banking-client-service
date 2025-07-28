-- CreateTable
CREATE TABLE "Cliente" (
    "id" UUID NOT NULL,
    "nome_completo" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "url_perfil" VARCHAR(100),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

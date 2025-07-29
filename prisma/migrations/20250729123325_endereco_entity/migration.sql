-- CreateTable
CREATE TABLE "endereco" (
    "id" UUID NOT NULL,
    "rua" VARCHAR(40) NOT NULL,
    "bairro" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "cep" VARCHAR(10) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "cliente_id" UUID NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "endereco_cliente_id_key" ON "endereco"("cliente_id");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

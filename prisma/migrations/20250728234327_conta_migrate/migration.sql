-- CreateTable
CREATE TABLE "conta" (
    "id" UUID NOT NULL,
    "numero_conta" VARCHAR(20) NOT NULL,
    "agencia" VARCHAR(10) NOT NULL,
    "saldo" DECIMAL(15,2) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "cliente_id" UUID NOT NULL,

    CONSTRAINT "conta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conta_numero_conta_key" ON "conta"("numero_conta");

-- CreateIndex
CREATE UNIQUE INDEX "conta_cliente_id_key" ON "conta"("cliente_id");

-- AddForeignKey
ALTER TABLE "conta" ADD CONSTRAINT "conta_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

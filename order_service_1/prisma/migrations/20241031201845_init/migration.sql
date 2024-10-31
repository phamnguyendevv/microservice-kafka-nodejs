-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

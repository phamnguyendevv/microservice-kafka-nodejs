-- CreateTable
CREATE TABLE "CartLineItems" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartLineItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartLineItems" ADD CONSTRAINT "CartLineItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `canteen_menu_ids` on the `canteen_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "canteen_order" DROP COLUMN "canteen_menu_ids";

-- CreateTable
CREATE TABLE "canteen_order_menu" (
    "id" TEXT NOT NULL,
    "canteen_order_id" VARCHAR(36) NOT NULL,
    "canteen_menu_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "canteen_order_menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "canteen_order_menu_canteen_order_id_canteen_menu_id_key" ON "canteen_order_menu"("canteen_order_id", "canteen_menu_id");

-- AddForeignKey
ALTER TABLE "canteen_order_menu" ADD CONSTRAINT "canteen_order_menu_canteen_order_id_fkey" FOREIGN KEY ("canteen_order_id") REFERENCES "canteen_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_order_menu" ADD CONSTRAINT "canteen_order_menu_canteen_menu_id_fkey" FOREIGN KEY ("canteen_menu_id") REFERENCES "canteen_menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

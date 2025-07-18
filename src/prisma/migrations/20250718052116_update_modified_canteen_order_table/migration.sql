/*
  Warnings:

  - You are about to drop the column `canteen_menu_id` on the `canteen_order` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `canteen_order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "canteen_order" DROP CONSTRAINT "canteen_order_canteen_menu_id_fkey";

-- AlterTable
ALTER TABLE "canteen_menu" ALTER COLUMN "menu_item_price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "canteen_order" DROP COLUMN "canteen_menu_id",
DROP COLUMN "order_status",
ADD COLUMN     "canteen_menu_ids" TEXT,
ADD COLUMN     "total_price" DOUBLE PRECISION DEFAULT 0;

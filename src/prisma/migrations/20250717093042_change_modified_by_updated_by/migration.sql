/*
  Warnings:

  - You are about to drop the column `modified_by` on the `canteen` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `canteen_menu` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `canteen_order` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `employee_created_at` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_updated_at` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `role` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canteen" DROP COLUMN "modified_by",
ADD COLUMN     "updated_by" VARCHAR(100);

-- AlterTable
ALTER TABLE "canteen_menu" DROP COLUMN "modified_by",
ADD COLUMN     "updated_by" VARCHAR(100);

-- AlterTable
ALTER TABLE "canteen_order" DROP COLUMN "modified_by",
ADD COLUMN     "updated_by" VARCHAR(100);

-- AlterTable
ALTER TABLE "company" DROP COLUMN "modified_by",
ADD COLUMN     "updated_by" VARCHAR(100);

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "employee_created_at",
DROP COLUMN "employee_updated_at",
DROP COLUMN "end_date",
DROP COLUMN "modified_by",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_by" VARCHAR(100);

-- AlterTable
ALTER TABLE "role" DROP COLUMN "modified_by",
ADD COLUMN     "updated_by" VARCHAR(100);

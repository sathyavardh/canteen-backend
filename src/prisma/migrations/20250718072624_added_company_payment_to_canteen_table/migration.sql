-- CreateTable
CREATE TABLE "company_payment_to_canteen" (
    "id" TEXT NOT NULL,
    "company_id" VARCHAR(36),
    "canteen_id" VARCHAR(36),
    "total_amount" DOUBLE PRECISION DEFAULT 0,
    "current_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "updated_by" VARCHAR(100),

    CONSTRAINT "company_payment_to_canteen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_payment_to_canteen" ADD CONSTRAINT "company_payment_to_canteen_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_payment_to_canteen" ADD CONSTRAINT "company_payment_to_canteen_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "canteen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

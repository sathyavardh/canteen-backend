-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "employee_name" VARCHAR(100),
    "employee_email" VARCHAR(150),
    "employee_password" VARCHAR(255),
    "employee_phone" VARCHAR(20),
    "employee_address" VARCHAR(255),
    "employee_position" VARCHAR(100),
    "employee_role_id" VARCHAR(36),
    "employee_company_id" VARCHAR(36),
    "employee_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_updated_at" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joining_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "company_name" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "role_name" VARCHAR(50),
    "role_description" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canteen" (
    "id" TEXT NOT NULL,
    "canteen_name" VARCHAR(100),
    "canteen_url" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "canteen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canteen_menu" (
    "id" TEXT NOT NULL,
    "menu_item_name" VARCHAR(100),
    "menu_item_description" VARCHAR(255),
    "menu_item_price" DOUBLE PRECISION,
    "canteen_id" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "canteen_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canteen_order" (
    "id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_status" VARCHAR(50),
    "canteen_id" VARCHAR(36),
    "canteen_menu_id" VARCHAR(36),
    "employee_id" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(100),
    "modified_by" VARCHAR(100),

    CONSTRAINT "canteen_order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_email_key" ON "employee"("employee_email");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_employee_role_id_fkey" FOREIGN KEY ("employee_role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_employee_company_id_fkey" FOREIGN KEY ("employee_company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_menu" ADD CONSTRAINT "canteen_menu_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "canteen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_order" ADD CONSTRAINT "canteen_order_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "canteen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_order" ADD CONSTRAINT "canteen_order_canteen_menu_id_fkey" FOREIGN KEY ("canteen_menu_id") REFERENCES "canteen_menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canteen_order" ADD CONSTRAINT "canteen_order_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

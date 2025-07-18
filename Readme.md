# 🥗 Canteen Management System

A robust backend system for managing canteen operations, including employee orders, canteen menus, role-based access, and company-level payments — all built using **Node.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

---

## 🚀 Features

- 🧑 Employee and Role Management  
- 🏢 Company Association and Payments  
- 🥘 Canteen Menu Management  
- 🧾 Order Placement with Multiple Menu Items  
- 🔒 Authentication-ready structure  
- 🧪 Scalable and well-structured project layout

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Joi** for schema validation (optional)
- **JWT** for authentication (optional)
- **Prisma Studio** for DB visualization

---

## 📁 Folder Structure

src/
│
├── controllers/
├── routes/
├── services/
├── middlewares/
├── validation/
├── utils/
├── config/
├── prisma/
│ └── schema.prisma
├── app.ts
└── server.ts

## 🧱 Setup Instructions

### 

```

1️⃣ Initialize the Project
npm init -y

2️⃣ Install Dev Dependencies
npm install typescript ts-node @types/node -D
npm install prisma -D

3️⃣ Initialize TypeScript
npx tsc --init

4️⃣ Initialize Prisma
For PostgreSQL:
npx prisma init --datasource-provider postgresql
This generates:

.env for DB credentials
prisma/schema.prisma for model definitions

5️⃣ Configure .env
Edit .env file:
env

DATABASE_URL="postgresql://postgres:2003@localhost:5432/canteenDb?schema=public"
🧬 Prisma Migrations & CLI Commands
1. Generate Prisma Client (after schema changes):

npm run prisma:generate
2. Run Migration (creates a new migration file + updates DB):

npm run prisma:migrate --name <your-migration-name>
Examples:

npm run prisma:migrate --name add-company-description
npm run prisma:migrate --name add-unique-to-role-name
npm run prisma:migrate --name change-modified-by-updated-by
npm run prisma:migrate --name modified-canteen-order-table
3. Push Schema to DB (without migrations):
npm run prisma:push
4. Open Prisma Studio (GUI for inspecting DB):
npm run prisma:studio
🔁 Scripts
Add to your package.json:

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:generate": "npx prisma generate",
  "prisma:migrate": "npx prisma migrate dev",
  "prisma:push": "npx prisma db push",
  "prisma:studio": "npx prisma studio"
}
📦 Models Overview

👨‍💼 Employee
Linked to Role and Company

Can place multiple CanteenOrders

🏢 Company
Has many Employees

Linked to CompanyPaymentToCanteen

🥘 Canteen & Menu
Canteen can have multiple CanteenMenus and Orders

Menu items stored in CanteenMenu

🧾 CanteenOrder
Linked to both Employee and Canteen

Has multiple items via CanteenOrderMenu

🍽️ CanteenOrderMenu
Junction table between CanteenOrder and CanteenMenu

Composite key ensures uniqueness per order-menu pair

💰 CompanyPaymentToCanteen
Tracks payment history between Company ↔ Canteen

🔚 Final Notes
Keep your Prisma schema in sync with real-world changes.

Always use prisma generate after model changes.

Leverage Prisma Studio for easy DB exploration.

🧑‍💻 Author
Sathyavardhan K
Backend Developer | MERN | TypeScript | Prisma | PostgreSQL
This project is part of a canteen automation backend suite.

📝 License MIT
---

Let me know if you'd like to include:

- Docker support
- Authentication flow
- API docs (Swagger / Postman)
- Sample seed data and test users

I'll add those as well.
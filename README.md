# 🌴 FunFly – Vacation Management System  
Full‑stack project built with **React + TypeScript + Redux**, **Node.js + Express + Sequelize**, **Docker Compose**, **LocalStack (S3)** & **Socket.IO**.

This README contains:

1. ✔️ Project Overview  
2. ✔️ How to Run (Local + Docker Compose)  
3. ✔️ Seeded Admin & User Credentials  
4. ✔️ Postman API Guide (simple, clean examples)  
5. ✔️ S3 Image Access  
6. ✔️ Socket.IO Events  
7. ✔️ Database Overview  

---

# 📦 1. Project Overview  

FunFly is a full vacation system that includes:

- JWT authentication  
- Admin & User roles  
- Create/Edit/Delete vacations (admin)  
- Follow/unfollow system (users)  
- Followers count  
- Real‑time updates with Socket.IO  
- Image hosting using LocalStack S3  
- Fully typed backend (TypeScript)

---

# 🚀 2. How to Run the Project

## Local Development
Backend default port: **3000**  
Frontend default port: **5173**

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## Docker Compose
Runs **frontend + backend + database + localstack + socket.io**.

```
docker compose up --build
```

Service URLs example:  
- Frontend → `<FRONTEND_URL>`  
- Backend → `<BACKEND_URL>`  
- S3 (LocalStack) → `<S3_BASE_URL>`  
- Socket.IO → `<IO_SERVER_URL>`

---

# 🔐 3. Seeded Admin & User Accounts

### Admins
| Name | Email | Password |
|------|--------|----------|
| **Shahar Solomianik** | `shahar@funfly.com` | **1234** |
| Dean Stark | `dean@funfly.com` | **1234** |

### Users
All regular users share the same password: **abcd**

| Name | Email |
|------|--------|
| Lior Ben Ari | `lior@example.com` |
| Niv Mor | `niv@example.com` |
| Yali Tal | `yali@example.com` |
| Ron Aviv | `ron@example.com` |
| Dana Mizrahi | `dana@example.com` |
| Tom Barak | `tom@example.com` |
| Ori Dayan | `ori@example.com` |
| Tal Reuven | `tal@example.com` |
| Yotam Raz | `yotam@example.com` |
| Inbar Levi | `inbar@example.com` |

---

# 🧪 4. Postman API Guide  
Below are **clean examples** without exposing localhost values.

Use your backend root URL as:

```
<BACKEND_URL>
```

Example: `<BACKEND_URL>/api/auth/login`

---

## 4.1 Login (Admin – Shahar)

**POST**  
`<BACKEND_URL>/api/auth/login`

Body:
```json
{
  "email": "shahar@funfly.com",
  "password": "1234"
}
```

Save the returned JWT in Postman → **Authorization: Bearer Token**

---

## 4.2 Signup (User)
**POST**  
`<BACKEND_URL>/api/auth/signup`

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "abcd"
}
```

---

# 🛫 5. Vacations API

## 5.1 Get all vacations
**GET**  
`<BACKEND_URL>/api/vacations`

---

## 5.2 Create vacation (ADMIN)
**POST**  
`<BACKEND_URL>/api/admin/vacations`  
Body → *form‑data*:

| Key | Value |
|-----|--------|
| destination | Example Destination |
| description | Example Description |
| startDate | YYYY‑MM‑DD |
| endDate | YYYY‑MM‑DD |
| price | 1800 |
| image | file upload |

---

## 5.3 Edit vacation (ADMIN)
**PUT**  
`<BACKEND_URL>/api/admin/vacations/{vacationId}`

---

## 5.4 Delete vacation (ADMIN)
**DELETE**  
`<BACKEND_URL>/api/admin/vacations/{vacationId}`

---

# ⭐ 6. Follow System (USER)

## 6.1 Follow a vacation
**POST**  
`<BACKEND_URL>/api/follows/{vacationId}`

## 6.2 Unfollow a vacation
**DELETE**  
`<BACKEND_URL>/api/follows/{vacationId}`

---

# 🖼️ 7. S3 Image Access (LocalStack)

Images are accessible at:

```
<S3_BASE_URL>/<BUCKET>/<imageName>
```

Example pattern:
```
<S3_BASE_URL>/images.funfly.com/dubai.png
```

---

# 🔌 8. Socket.IO Events

| Event | Description |
|--------|-------------|
| `vacation-created` | A vacation was added |
| `vacation-edited` | A vacation was updated |
| `vacation-deleted` | A vacation was deleted |
| `follow-updated` | A user followed/unfollowed |

---

# 🗄️ 9. Database Overview

### `users`
- id  
- first_name  
- last_name  
- email  
- password  
- role  

### `vacations`
- id  
- destination  
- description  
- start_date  
- end_date  
- price  
- image_name  

### `follows`
- user_id  
- vacation_id  


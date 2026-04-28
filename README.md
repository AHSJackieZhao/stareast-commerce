# StarEast Commerce API

## Description

A RESTful e-commerce API built with Node.js and Express. It provides user authentication via JWT tokens and a checkout flow with cash and credit card payment support. All data is stored in memory — no database required.

---

## Installation

```bash
cd stareast-commerce
npm install
```

---

## How to Run

```bash
npm start
```

The server starts on **http://localhost:3000**  
Swagger UI is available at **http://localhost:3000/api-docs**

---

## Rules

- Only authenticated users can perform checkout.
- Accepted payment methods: `cash` and `credit_card`.
- Paying with **cash** applies a **10% discount** on the subtotal.
- JWT tokens expire after **1 hour**.

---

## Data Already Existent

### Users

| Username   | Email                | Password     |
|------------|----------------------|--------------|
| john_doe   | john@example.com     | password123  |
| jane_doe   | jane@example.com     | password456  |
| admin      | admin@example.com    | admin123     |

### Products

| ID | Name           | Price    |
|----|----------------|----------|
| 1  | Laptop         | $999.99  |
| 2  | Wireless Mouse | $29.99   |
| 3  | USB-C Hub      | $49.99   |

---

## How to Use the REST API

### 1. Health Check

**GET** `/health`

```bash
curl http://localhost:3000/health
```

Response:
```json
{ "status": "ok", "timestamp": "2026-04-28T12:00:00.000Z" }
```

---

### 2. Register

**POST** `/auth/register`

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "username": "new_user", "email": "new@example.com", "password": "mypassword" }'
```

Response `201`:
```json
{
  "message": "User registered successfully",
  "user": { "id": "4", "username": "new_user", "email": "new@example.com" }
}
```

---

### 3. Login

**POST** `/auth/login`

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "username": "john_doe", "password": "password123" }'
```

Response `200`:
```json
{ "token": "<JWT_TOKEN>" }
```

---

### 4. Checkout

**POST** `/checkout`  
Requires `Authorization: Bearer <JWT_TOKEN>` header.

**With cash (10% discount applied):**
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "items": [
      { "productId": "1", "quantity": 1 },
      { "productId": "2", "quantity": 2 }
    ],
    "paymentMethod": "cash"
  }'
```

Response `200`:
```json
{
  "message": "Checkout successful",
  "order": {
    "items": [
      { "productId": "1", "name": "Laptop", "price": 999.99, "quantity": 1, "itemTotal": 999.99 },
      { "productId": "2", "name": "Wireless Mouse", "price": 29.99, "quantity": 2, "itemTotal": 59.98 }
    ],
    "subtotal": 1059.97,
    "discount": 105.99,
    "total": 953.98,
    "paymentMethod": "cash"
  }
}
```

**With credit card (no discount):**
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "items": [{ "productId": "3", "quantity": 1 }],
    "paymentMethod": "credit_card"
  }'
```

# Capilano

## Entities

### Users

id PK
email
password

### Products

id PK
title
price
description
category_id FK
image

### Orders

id PK
product_id FK
quantity
total
created_at
user_id FK

### Categories

id PK
name
product_id FK

## Endpoints

### auth

POST /auth/register
POST /auth/login

### products

GET /products
GET /products/:id

### cart

POST /cart
GET /cart
PUT /cart/:product_id
DELETE /cart/:product_id
POST /cart/checkout

### orders

GET /orders/:id

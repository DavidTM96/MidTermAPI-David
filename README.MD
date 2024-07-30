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
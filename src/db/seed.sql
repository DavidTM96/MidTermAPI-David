INSERT INTO users (email, password) 
VALUES ('test123@gmail.com', 'password123'),
       ('random@gmail.com', 'admin123'),
       ('user123@gmail.com', 'user123');

INSERT INTO products (title, price, description,  image_url)
VALUES ('Nike Evo', 100.00, 'Running Sneakers', 'https://via.placeholder.com/150');

INSERT INTO orders (product_id, quantity, user_id)
VALUES (1, 3,  1);

INSERT INTO categories (name)
VALUES ('Sneakers');

INSERT INTO product_categories (product_id, category_id)
VALUES (1, 1);
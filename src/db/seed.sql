INSERT INTO users (email, password) 
VALUES ('test123@gmail.com', 'password123');

INSERT INTO products (title, price, description, category_id, image_url)
VALUES ('Nike Evo', 100.00, 'Running Sneakers', 1, 'https://via.placeholder.com/150');

INSERT INTO orders (product_id, quantity, total, user_id)
VALUES (1, 3, 300.00, 1);

INSERT INTO categories (name, product_id)
VALUES ('Sneakers', 1);